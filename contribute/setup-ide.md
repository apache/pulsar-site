---
id: setup-ide
title: Setting up an IDE
---

Apache Pulsar is using [lombok](https://projectlombok.org/), so you have to ensure your IDE setup with required plugins.

## IntelliJ IDEA

### Configure Project JDK to JDK 17

1. Open **Project Settings**. Click **File** → **Project Structure** → **Project Settings** → **Project**.
2. Select the JDK version. From the JDK version drop-down list, select **Download JDK...** or choose an existing recent Java 17 JDK version [installed by SDKMAN](setup-buildtools.md).
3. In the download dialog, select version **17** and vendor **Amazon Corretto**.

### Configure Java version for Maven

1. Open Maven Importing Settings. Click **Settings** → **Build, Execution, Deployment** → **Build Tools** → **Maven** → **Importing**.
2. For **JDK for Importer** setting, select **Use Project JDK**. This uses the Java 17 JDK for running Maven when importing the project.
3. Ensure that the JRE setting in **Maven** → **Runner** dialog is set to **Use Project JDK**.

:::caution

Some configuration in the Maven build is conditional based on the JDK version. Incorrect configuration gets chosen when the "JDK for Importer" isn't the same as the "Project JDK".

:::

### Configure annotation processing

1. Open Annotation Processors Settings. Click **Settings** → **Build, Execution, Deployment** → **Compiler** → **Annotation Processors**.
2. Select the following buttons:
   1. **Enable annotation processing**
   2. **Obtain processors from project classpath**
   3. Store generated sources relative to: **Module output directory**
3. Set the generated source directories to be equal to the Maven directories:
   1. Set "Production sources directory:" to "generated-sources".
   2. Set "Test sources directory:" to "generated-test-sources".
4. Click **OK**.
5. Install the lombok plugin in intelliJ.

### Configure code style

1. Open Code Style Settings dialog box by going to **Settings** → **Editor** → **Code Style**.
2. Click on the :gear: symbol → **Import scheme** → **IntelliJ IDEA code style XML**
3. Pick the file `${pulsar_dir}/src/idea-code-style.xml`
4. On the dialog box that opens, click **OK**.
5. Ensure the scheme you just created is selected in **Scheme** dropdown then click **OK**.

### Configure Checkstyle

1. Install the Checkstyle-IDEA plugin.
2. Open Checkstyle Settings. Click **Settings** → **Tools** → **Checkstyle**.
3. Set **Checkstyle version** to **10.14.2**.
4. Set **Scan scope** to **Only Java sources (including tests)**.
5. Click **+** button in the **Configuration** section to open a dialog to choose the checkstyle config file.
   1. Enter a **Description**. For example, Pulsar.
   2. Select **Use a local checkstyle file**.
   3. Set **File** to **buildtools/src/main/resources/pulsar/checkstyle.xml**.
   4. Select **Store relative to project location**.
   5. Click **Next** → **Next** → **Finish**.
6. Activate the configuration you just added by toggling the corresponding box.
7. Click **OK**.

### Further configuration

* When working on the Pulsar core modules in IntelliJ, reduce the number of active projects in IntelliJ to speed up IDE actions and reduce unrelated IDE warnings.
  * In IntelliJ's Maven UI's tree view under "Profiles"
    * Activate "core-modules" Maven profile
    * De-activate "main" Maven profile
    * Run the "Reload All Maven Projects" action from the Maven UI toolbar. You can also find the action by the name in the IntelliJ "Search Everywhere" window that gets activated by pressing the **Shift** key twice.
* Run the "Generate Sources and Update Folders For All Projects" action from the Maven UI toolbar. You can also find the action by the name in the IntelliJ "Search Everywhere" window that gets activated by pressing the **Shift** key twice. Running the action takes about 10 minutes for all projects. This is faster when the "core-modules" profile is the only active profile.

### Troubleshooting

* In the case of compilation errors with missing Protobuf classes, ensure to run the "Generate Sources and Update Folders For All Projects" action.
* When all the Pulsar source code doesn't compile properly in IntelliJ and there are compilation errors:
  * Use the "core-modules" profile if working on the Pulsar core modules since the source code for those modules can be compiled in IntelliJ.
  * Sometimes it might help to mark a specific project ignored in IntelliJ Maven UI by right-clicking the project name and select **Ignore Projects** from the menu.
  * Currently, it is not always possible to run unit tests directly from the IDE because of the compilation issues. As a workaround, individual test classes can be run by using the `mvn test -Dtest=TestClassName` command.
* The above steps have all been performed, but a test still won't run.
  * In this case, try the following steps:
    1. Close IntelliJ.
    2. Run `mvn clean install -DskipTests` on the command line.
    3. Reopen IntelliJ.
  * If that still doesn't work:
    1. Verify Maven is using a supported version. Currently, the supported version of Maven is specified in the `<requireMavenVersion>` section of the root `pom.xml` file.
    2. Try "restart and clear caches" in IntelliJ and repeat the above steps to reload projects and generate sources.

## Visual Studio Code (VS Code)

Before starting, make sure you have installed the [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) in VS Code.

Since multiple versions of Java are used for Pulsar development, it is recommended to use [SDKMAN](https://sdkman.io/installation) to manage different versions of Java. The separate guide [how to setup build tools](setup-buildtools.md) explains how to install Java 17 and 21 using SDKMAN.

Once you have installed the Java versions using SDKMAN, you can add (or modify) the following settings to your VS Code User level `settings.json` file. Please check [VS Code documentation](https://code.visualstudio.com/docs/getstarted/settings) for more details. The simplest way to open the settings file is to run the `Preferences: Open Settings (JSON)` command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).

```json
{
    "java.jdt.ls.vmargs": "-Xmx6g -XX:+UseZGC -XX:+ZGenerational -Dsun.zip.disableMemoryMapping=true",
    "java.jdt.ls.java.home": "~/.sdkman/candidates/java/21",
    "java.configuration.runtimes": [
        {
            "name": "JavaSE-21",
            "path": "~/.sdkman/candidates/java/21",
            "default": true
        },
        {
            "name": "JavaSE-17",
            "path": "~/.sdkman/candidates/java/17"
        }
    ],
    "java.autobuild.enabled": false,
    "java.debug.settings.onBuildFailureProceed": true,
    "java.compile.nullAnalysis.mode": "disabled",
    "java.configuration.updateBuildConfiguration": "interactive"
}
```

If the `java.jdt.ls.java.home` setting doesn't point to a Java 21 JDK, you must remove `-XX:+ZGenerational` from `java.jdt.ls.vmargs` setting since Java 21 is the first version that supports generational ZGC.

The `java.autobuild.enabled` setting is set to `false` since building the Pulsar project in VS Code takes very long time.

The `java.debug.settings.onBuildFailureProceed` is set to `true` so that tests can be run even when there are individual build failures.

Before running tests, you need to build the project manually at least once using the following command:

```shell
mvn -Pcore-modules,-main -T 1C clean install -DskipTests -Dspotbugs.skip=true -Dcheckstyle.skip=true -Dlicense.skip=true -DnarPluginPhase=none
```

This will make the protobuf / lightproto generated classes available to the tests run in the IDE. Without this there will be errors at runtime about missing classes or Mockito related errors.

For troubleshooting, please check [Language support for Java extension documentation](https://github.com/redhat-developer/vscode-java/wiki/Troubleshooting). Adding `"java.transport": "stdio"` to the settings can help display errors in the error log if the problem is related to the language server.

## Eclipse

Follow [these instructions](https://howtodoinjava.com/automation/lombok-eclipse-installation-examples/) to configure your Eclipse setup.
