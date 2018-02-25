import * as Atom from "atom"
import {TypescriptServiceClient} from "../../../client/client"
import {StatusPanel} from "../../atom/components/statusPanel"
import {TypescriptBuffer} from "../../typescriptBuffer"

export interface Dependencies {
  getTypescriptBuffer: GetTypescriptBuffer
  clearErrors(): void
  getClient(filePath: string): Promise<TypescriptServiceClient>
  getStatusPanel(): StatusPanel
}

export type GetTypescriptBuffer = (
  filePath: string,
) => Promise<{buffer: TypescriptBuffer; isOpen: boolean}>

export type AllowedSelectors = "atom-text-editor" | "atom-workspace"

export type CommandDescription<Selector extends AllowedSelectors> = (
  deps: Dependencies,
) => Atom.CommandRegistryListener<Atom.CommandRegistryTargetMap[Selector]>

export interface CommandDescriptionWithSelector<Selector extends AllowedSelectors> {
  selector: Selector
  command: string
  desc: CommandDescription<Selector>
}

// To allow using dependency injection, but avoid having to type a lot of boilerplate, we have the
// individual command files register themselves in the below map. When the package is initializing,
// the constructors are passed the deps and return the actual commands handlers.
const commands: Array<CommandDescriptionWithSelector<AllowedSelectors>> = []

export function addCommand<Selector extends AllowedSelectors>(
  selector: Selector,
  command: string,
  desc: CommandDescription<Selector>,
) {
  commands.push({selector, command, desc})
}

export function getCommands() {
  return commands
}
