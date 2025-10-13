> [!TIP]
> Neovize currently only supports Lua outputs. Possibly in the future, **VimScript** will also be added.

# Example Configuration
```json
{
  "launcherMessage": "Close Neovim using :q ~ Learn more using :help ~ Use commands using :",
  "dashboard": {
    "message": "Neovize",
    "alignment": {
      "gridWidth": 1,
      "gridHeight": "auto",
      "horizontalSpacing": 2,
      "verticalSpacing": 1
    },
    "buttons": {
      "Button2": {
        "keybind": "e",
        "text": "New File",
        "action": "ene <BAR> startinsert<CR>"
      }
    },
    "footer": "Neovim styled beautifully using JavaScript"
  },
  "packages": [
    "goolord/alpha-nvim"
  ]
}
```