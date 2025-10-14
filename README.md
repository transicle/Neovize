> [!TIP]
> Neovize currently only supports Lua outputs. Possibly in the future, **VimScript** will also be added.

# Example Configuration
```json
{
  "launcherMessage": "Learn Neovim using :help ~ Use commands using :",
  "dashboard": {
    "footer": "Neovim configuration made simple using JavaScript.",
    "buttons": {
      "Button2": {
        "keybind": "e",
        "text": "New File",
        "action": "ene <BAR> startinsert<CR>"
      }
    },
    "message": [
      "    _   __                _          ",
      "   / | / /__  ____ _   __(_)___  ___ ",
      "  /  |/ / _ \\/ __ \\ | / / /_  / / _ \\",
      " / /|  /  __/ /_/ / |/ / / / /_/  __/",
      "/_/ |_/\\___/\\____/|___/_/ /___/\\___/ ",
      "                                     "
    ]
  },
  "packages": [
    "goolord/alpha-nvim"
  ]
}
```

---

# Preview
<img width="806" height="536" alt="image" src="https://github.com/user-attachments/assets/ad8f4aed-2ed7-49cf-89f2-84de6f3a256d" />