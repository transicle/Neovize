> [!TIP]
> Neovize currently only supports Lua outputs. Possibly in the future, **VimScript** will also be added.

# Example Configuration
```json
{
  "dashboard": {
    "footer": "Neovim configuration made simple using JavaScript.",
    "buttons": {
      "Button1": {
        "keybind": "e",
        "text": "New File",
        "action": "ene <BAR> startinsert<CR>"
      },
      "Button2": {
        "keybind": "l",
        "text": "Open Previous",
        "action": "e#<CR>"
      }
    },
    "message": [
      " #     #                                      ",
      " ##    # ######  ####  #    # # ###### ###### ",
      " # #   # #      #    # #    # #     #  #      ",
      " #  #  # #####  #    # #    # #    #   #####  ",
      " #   # # #      #    # #    # #   #    #      ",
      " #    ## #      #    #  #  #  #  #     #      ",
      " #     # ######  ####    ##   # ###### ###### ",
      "                                              "
    ]
  },
  "packages": [
    "goolord/alpha-nvim",
    "nvim-tree/nvim-tree.lua"
  ]
}
```

---

# Preview
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6db23983-e87c-41d6-bc2b-c5992ec6dd20" />
