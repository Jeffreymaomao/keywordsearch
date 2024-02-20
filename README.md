# KeyWordSearch

This is a simple web application that allows users to input keywords for searching and displays results matching the keywords.

## How to Use

1. Enter keywords in the search box.
2. The application will display results matching the keywords.

Application entry: https://jeffreymaomao.github.io/keywordsearch.github.io/dist

## Technology Stack

- HTML
- CSS
- JavaScript

## Database Structure

The data structure is stored in a NoSQL (Non-SQL) database management system. Here's the structure:

```json
{
    "<element id>": {
        "p": "<parent id>",
        "n": "<name>",
        "k": ["<key1>", "<key2>", ...],
        "t": "<time>",
        ...
    },
    "<element id>": {
        "p": "<parent id>",
        "n": "<name>",
        "k": ["<key1>", "<key2>", ...],
        "t": "<time>",
        ...
    },
    ...
}
```

- `<element id>`: Unique identifier for each element.
- `"p"`: Parent id of the element.
- `"n"`: Name of the element.
- `"k"`: Array of keywords associated with the element.
- `"t"`: Time of creation or last modification of the element.

## Developer

- Developer: Chang-Mao Yang (楊長茂)
- Email: jeffrey0613mao@gmail.com

Contributions and suggestions are welcome!