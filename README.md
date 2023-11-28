# ArnakPodiumim
 An ארנק פודיומים (trademark pending) written in JS with Node.

# What's an ArnakPodiumim?
An arnak podiumim is basically a counter of how many podiums each competitor got.

# Dependencies
 * [NodeJS]("https://nodejs.org/en/") (Node CLI tool for `node` and `npm` commands)
 * The [puppeteer](https://github.com/puppeteer/puppeteer/tree/main#readme) NodeJS module.
 * The [File System](https://nodejs.org/api/fs.html) (`fs`) NodeJS module.

# Run The code
 First, to fetch the results from the [Tahash Website](https://tuvistone.wixsite.com/website/), run (in a terminal):

    node fetchresults.js

The current week's results will then be loaded (In `json` format) into `results.json`.  
After the file was loaded with the data, run

    node index.js

The arnak will now be stored in `arnak.txt`.  

### Enjoy!