

import * as util from "util";
import { ExtensionApi as GradleApi, RunTaskOpts, Output } from "vscode-gradle";
import { extensions } from "vscode"




export interface Dependency {
  path: string,
}


async function get_gradle_dependencies(variant: string, path: string, callback: (dependencies: ReadonlyArray<Dependency>) => void): Promise<void> {
  const extension = extensions.getExtension("vscjava.vscode-gradle");
  const gradleApi = extension!.exports as GradleApi;

  const runTaskOpts: RunTaskOpts = {
    projectFolder: path,
    taskName: "dependencies",
    args: ["--configuration", variant + "CompileClasspath"],
    showOutputColors: false,
    onOutput: (output: Output): void => {
      const message = new util.TextDecoder("utf-8").decode(
        output.getOutputBytes_asU8()
      );
      console.log(output.getOutputType(), message);
    },
  };
  await gradleApi.runTask(runTaskOpts);
}