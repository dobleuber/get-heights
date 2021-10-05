# Match Heights
## Project description

The project is to write a function that searches through NBA player heights
based on user input. The raw data is taken from
[here](https://www.openintro.org/data/index.php?data=nba_heights).  The data is
served in json format by the endpoint
[here](https://mach-eight.uc.r.appspot.com/).

The task is to create an application that takes a single integer input. The
application will download the raw data from the website above
(https://mach-eight.uc.r.appspot.com) and print a list of all pairs of players
whose height in inches adds up to the integer input to the application. If no
matches are found, the application will print "No matches found"

Sample output is as follows:
```
> app 139

- Brevin Knight         Nate Robinson
- Nate Robinson         Mike Wilks
```

The algorithm to find the pairs must be faster than O(n^2). All edge cases
should be handled appropriately. Though not strictly required, demonstrating
comfort in writing unit tests will make your submission stand out. This is
_not_ a closed book test. You are encouraged to reach out with any questions
that you come across.

## Project setup

This projects was written in nodejs `v14.16.1`.
`yarn` is preferred to manage dependencies.

After download the project, please install the dependencies by running:
```
yarn
```

You can run the test by running:
```
yarn test
```

For getting the match heights for `139`, you should run:
```
yarn start 139
```
Or you can use node too:
```
node index.js 139
```