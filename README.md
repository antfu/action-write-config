# Write Config (Github Actions)

A GitHub Action to write config to file

## Example

```yaml
- uses: antfu/action-write-config
  with:
    # the file path to be saved, yaml is also supported
    path: 'config.json'

    # can be an object
    data: 
      foo: 'bar'
      hello: 'world'
```

`config.json` will be:

```json
{
  "foo": "bar",
  "hello": "world"
}
```
