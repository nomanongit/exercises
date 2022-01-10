import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkRecommended from 'remark-preset-lint-recommended';
import remarkListItemIndent from 'remark-lint-list-item-indent';
import { visit } from 'unist-util-visit';
import { remove } from 'unist-util-remove';
import { execSync } from 'child_process';
// import fs and path
import fs from 'fs';
import path from 'path';


// Get the file name from the command-line arguments
const filename = process.argv[2];
const workingDir = process.argv[3];
const offset = process.argv[4];

// Create working directory if it doesn't exist
if (!fs.existsSync(workingDir)) {
  fs.mkdirSync(workingDir);
}

const options = {
  cwd: workingDir
};

// Get basename of the file
const basename = path.basename(filename, '.md');

// Read the Markdown text from the file
const markdownText = fs.readFileSync(filename, 'utf8');

const processor = remark()
  .use(remarkParse)
  .use(() => (tree) => {
    let counter = offset;

    // Remove all existing generated image nodes from the tree
    console.log("Removing image nodes")
    remove(tree, (node) => node.type === 'image' && node.url.startsWith('/.images/shell') )


    // Process all HTML comments in the tree
    visit(tree, 'html', (comment_node, index, parent) => {

      if (comment_node.value.startsWith('<!--') && comment_node.value.endsWith('-->')) {

        // An example Comment node
        //   <!--
        //   ```shellSession
        //   # Code block 1
        //   > echo "hello"
        //   > echo "hello"
        //   ```
        //
        //   ```shellSession
        //   # Code block 2
        //   > echo "hello"
        //   > echo "hello"
        //   ```
        //   -->

        // Remove the leading and trailing comment markers
        const raw_comment_node = comment_node.value.slice(4, -3).trim();

        // Parse the comment node as Markdown
        const parsed_comment_node = remark().parse(raw_comment_node);

        // For each code block in the comment node...
        for (const cb_node of parsed_comment_node.children) {

          // We use the shellSession tag to identify shell commands
          if (cb_node.lang === 'shellSession') {

            const commands = cb_node.value.split('\n')
              // Filter out lines starting with $
              .filter(line => line.startsWith('$'))
              // Escape each line
              .map(line => line.replace(/'/g, "'\\''"))
              // Remove the > at the beginning of each line
              .map(line => `${line.slice(2)}`)

            let image_nodes = [];

            if (commands.length === 1) {
                const command = commands[0];

                console.log(command)

                // term-script outputs raw SVG data to stdout
                const cmd_output = execSync(`unbuffer ${command} | term-transcript capture '${command}'`, options).toString().trim();

                const imageFilename = `${basename}-shell-${counter++}.svg`;

                // Write the captured output to an SVG file
                fs.writeFileSync(path.join('../.images/shell', imageFilename), cmd_output);

                image_nodes.push({
                  type: 'image',
                  url: path.join('/.images/shell', imageFilename),
                  alt: `'${command}'`,
                })
            }
            else if (commands.length > 1) {

              // Join all commands into a single string with each command escaped by single quotes
              let command = commands.map(line => `'${line}'`).join(' ');

              console.log(command)

              // term-script outputs raw SVG data to stdout
              const cmd_output = execSync(`term-transcript exec ${command} --pty -I 1s`, options).toString().trim();

              const imageFilename = `${basename}-shell-${counter++}.svg`;

              // Write the captured output to an SVG file
              fs.writeFileSync(path.join('../.images/shell', imageFilename), cmd_output);

              image_nodes.push({
                type: 'image',
                url: path.join('/.images/shell', imageFilename),
                alt: `'${command}'`,
              })
            }

            // Insert the image node(s) after the current code node
            parent.children.splice(index + 1, 0, {
              type: 'paragraph',
              children: image_nodes
            });
          }
        }
      }
    });
  })
  .use(remarkRecommended)
  .use(remarkListItemIndent, 'space')
  .use(remarkStringify);

const result = processor.processSync(markdownText).toString();

// Write result to file
const outputPath = path.join('../','.github', 'steps', `${basename}.md`);
fs.writeFileSync(outputPath, result);