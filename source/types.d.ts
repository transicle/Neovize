export type Config = {
    "launcherMessage": string,
    "dashboard": {
        "message": Array<string>,
        "buttons": Record<string, {
            keybind: string,
            text: string,
            action: string
        }>,
        "alignment": {
            gridWidth: number,
            gridHeight: string | number,
            horizontalSpacing: number,
            verticalSpacing: number
        },
        "footer": string
    },
    "packages": Array<string>,
    [key: string]: any;
}

export type AsciiArtFonts =
  | "Banner"
  | "Big"
  | "Block"
  | "Bubble"
  | "Digital"
  | "Ivrit"
  | "Lean"
  | "Mini"
  | "Mnemonic"
  | "Script"
  | "Shadow"
  | "Slant"
  | "Small"
  | "Smscript"
  | "Smshadow"
  | "Smslant"
  | "Standard"
  | "Term";