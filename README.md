# Image Optimization CLI Tool

A command-line interface tool built with TypeScript for optimizing and downscaling images in bulk. This tool can process entire directories of images, optimizing them either by size or resolution.

## Features

- Bulk image processing
- Recursive directory scanning
- Two optimization modes:
  - By Size: Reduce image file size to a specified maximum
  - By Resolution: Downscale images to a maximum width and height
- Supports JPG, JPEG, and PNG formats
- Preserves directory structure in the output
- Detailed logging for transparency and debugging

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/image-optimization-cli.git
   cd image-optimization-cli
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

## Usage

To start the CLI tool, run:

```
npm run serve
```

Follow the prompts to:
1. Enter the source directory path
2. Enter the destination directory path
3. Choose the optimization method (By Size or By Resolution)
4. Specify the optimization parameters (max size in MB or max width,height)

## Scripts

- `npm start`: Run the CLI tool
- `npm run build`: Compile TypeScript to JavaScript
- `npm run serve`: Run the compiled JavaScript version

## Project Structure

```
src/
├── index.ts           # Entry point
├── utils/
│   ├── terminal.js    # Terminal prompt utilities
│   ├── logger.js      # Logging utilities
│   ├── entry.js       # Main application logic
│   ├── downScaleBySize.js
│   └── downScaleByResolution.js
```

## Dependencies

- inquirer: For interactive command line user interfaces
- sharp: For high-performance image processing
- winston: For logging
- path: For file path operations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
