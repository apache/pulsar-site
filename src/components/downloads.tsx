import React from 'react'
import pulsarReleases from '@site/releases.json'
import connectors from '@site/data/connectors'
import cppReleases from '@site/data/release-cpp'
import goReleases from '@site/data/release-go'
import nodeReleases from '@site/data/release-node'
import pythonReleases from '@site/data/release-python'
import pulsarManagerReleases from '@site/data/release-pulsar-manager'
import pulsarAdaptersReleases from '@site/data/release-pulsar-adapters'
import ReleaseTable from "@site/src/components/ReleaseTable";
import ConnectorTable from "@site/src/components/ConnectorTable";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import OldReleaseTable from "@site/src/components/OldReleaseTable";
import ClientReleasesTable from "@site/src/components/ClientReleasesTable";
import useBaseUrl from "@docusaurus/useBaseUrl";

type VersionProps = { version?: string }

// Milestone releases (e.g. 5.0.0-M1) are published ahead of an LTS release and
// are not meant for production use.
function isMilestoneVersion(version: string): boolean {
    return /-M\d+/i.test(version)
}

// Connectors moved to a separate repository starting with Pulsar 5.0 (PIP-465),
// so 5.x+ releases no longer ship connector NARs.
function versionHasConnectors(version: string): boolean {
    return Number(version.split('.')[0]) < 5
}

// The "major.minor" feature line of a version, e.g. "5.0.0-M1" -> "5.0".
function featureLine(version: string): string {
    const [major, minor] = version.split('.')
    return `${major}.${minor}`
}

// The latest non-milestone (stable) release, falling back to the latest release.
function latestStablePulsarVersion(): string {
    return pulsarReleases.find((v) => !isMilestoneVersion(v)) ?? pulsarReleases[0]
}

export function CurrentPulsarVersion(): JSX.Element {
    return <>{pulsarReleases[0]}</>
}

export function CurrentPulsarManagerVersion(): JSX.Element {
    return <>{pulsarManagerReleases[0]}</>
}

export function CurrentPulsarAdaptersVersion(): JSX.Element {
    return <>{pulsarAdaptersReleases[0]}</>
}

export function CurrentPulsarDownloadTable({ version }: VersionProps = {}): JSX.Element {
    const latestVersion = version ?? pulsarReleases[0]
    const latestArchiveMirrorUrl = getLatestArchiveMirrorUrl(latestVersion, "bin")
    const latestSrcArchiveMirrorUrl = getLatestArchiveMirrorUrl(latestVersion, "src")
    const latestArchiveUrl = distUrl(latestVersion, "bin")
    const latestSrcArchiveUrl = distUrl(latestVersion, "src")
    const data = [
        {
            release: "Binary",
            link: latestArchiveMirrorUrl,
            linkText: `apache-pulsar-${latestVersion}-bin.tar.gz`,
            asc: `${latestArchiveUrl}.asc`,
            sha512: `${latestArchiveUrl}.sha512`,
        },
        {
            release: "Source",
            link: latestSrcArchiveMirrorUrl,
            linkText: `apache-pulsar-${latestVersion}-src.tar.gz`,
            asc: `${latestSrcArchiveUrl}.asc`,
            sha512: `${latestSrcArchiveUrl}.sha512`,
        },
    ]
    return <div>
        <ReleaseTable data={data}></ReleaseTable>
    </div>
}

export function CurrentPulsarOffloadersDownloadTable({ version }: VersionProps = {}): JSX.Element {
    const latestVersion = version ?? pulsarReleases[0]
    const data = [
        {
            release: "Offloaders",
            link: getLatestOffloadersMirrorUrl(latestVersion),
            linkText: `apache-pulsar-offloaders-${latestVersion}-bin.tar.gz`,
            asc: `${distOffloadersUrl(latestVersion)}.asc`,
            sha512: `${distOffloadersUrl(latestVersion)}.sha512`,
        },
    ]
    return <div className="tailwind">
        <ReleaseTable data={data}></ReleaseTable>
    </div>
}

export function CurrentPulsarConnectorsDownloadTable({ version }: VersionProps = {}): JSX.Element {
    const latestVersion = version ?? pulsarReleases[0]
    const data = connectors.map((connector) => ({
        connector: connector.link,
        connectorText: connector.longName,
        archive: `${connectorDownloadUrl(
            connector.name,
            latestVersion
        )}`,
        archiveText: `pulsar-io-${connector.name}-${latestVersion}.nar`,
        asc: `${connectorDistUrl(connector.name, latestVersion)}.asc`,
        sha512: `${connectorDistUrl(
            connector.name,
            latestVersion
        )}.sha512`,
    }))
    return <div className="tailwind">
        <ConnectorTable data={data}></ConnectorTable>
    </div>
}

export function CurrentPulsarShellDownloadTable({ version }: VersionProps = {}): JSX.Element {
    const latestVersion = version ?? pulsarReleases[0]
    const data = [
        {
            release: "Linux / MacOS",
            link: getLatestShellMirrorUrl(latestVersion, "tar.gz"),
            linkText: `apache-pulsar-shell-${latestVersion}-bin.tar.gz`,
            asc: `${distShellUrl(latestVersion, "tar.gz")}.asc`,
            sha512: `${distShellUrl(latestVersion, "tar.gz")}.sha512`,
        },
        {
            release: "Windows",
            link: getLatestShellMirrorUrl(latestVersion, "zip"),
            linkText: `apache-pulsar-shell-${latestVersion}-bin.zip`,
            asc: `${distShellUrl(latestVersion, "zip")}.asc`,
            sha512: `${distShellUrl(latestVersion, "zip")}.sha512`,
        }
    ]
    return <div className="tailwind">
        <ReleaseTable data={data}></ReleaseTable>
    </div>
}

function ArchiveNote({ label }: { label: string }): JSX.Element {
    return <p>
        You can download all previous versions of {label} at{' '}
        <a href="https://archive.apache.org/dist/pulsar/">the archive page</a>.
    </p>
}

// Renders the binary/source, shell, offloaders and (for pre-5.x releases) connectors
// download tables for a single Pulsar version. The `primary` section owns the canonical
// `#shell`/`#offloaders`/`#connectors` anchors that other pages link to; a secondary
// (milestone) section uses prefixed ids so the heading anchors stay unique.
function PulsarReleaseDownloads({ version, primary }: { version: string, primary: boolean }): JSX.Element {
    const anchor = (name: string) => (primary ? name : `milestone-${name}`)
    return <>
        <ArchiveNote label="Pulsar" />
        <CurrentPulsarDownloadTable version={version} />

        <h3 id={anchor("shell")}>Shell</h3>
        <ArchiveNote label="Pulsar shell" />
        <CurrentPulsarShellDownloadTable version={version} />

        <h3 id={anchor("offloaders")}>Offloaders</h3>
        <ArchiveNote label="offloaders" />
        <CurrentPulsarOffloadersDownloadTable version={version} />

        {versionHasConnectors(version) && <>
            <h3 id={anchor("connectors")}>Connectors</h3>
            <ArchiveNote label="connectors" />
            <CurrentPulsarConnectorsDownloadTable version={version} />
        </>}
    </>
}

export function CurrentPulsarDownloads(): JSX.Element {
    const releasePolicyUrl = useBaseUrl('/contribute/release-policy')
    const current = pulsarReleases[0]

    if (!isMilestoneVersion(current)) {
        return <>
            <h2 id="current-version">Current version {current}</h2>
            <PulsarReleaseDownloads version={current} primary={true} />
        </>
    }

    const stable = latestStablePulsarVersion()
    return <>
        <h2 id="current-version">Pulsar {featureLine(current)} milestone release {current}</h2>
        <p>
            This is a milestone release published ahead of the {featureLine(current)} LTS release.
            Milestone releases are intended for early testing and feedback and are{' '}
            <strong>not meant for production use</strong>; see the{' '}
            <a href={releasePolicyUrl}>release policy</a> for details.
        </p>
        <PulsarReleaseDownloads version={current} primary={false} />

        <h2 id="current-stable-version">Current stable version {stable}</h2>
        <PulsarReleaseDownloads version={stable} primary={true} />
    </>
}

const legacyReleaseNoteVersions = [
    "2.5.0",
    "2.4.2",
    "2.4.1",
    "2.4.0",
    "2.3.2",
    "2.3.1",
    "2.3.0",
    "2.2.1",
    "2.2.0",
    "2.1.1-incubating",
    "2.1.0-incubating",
    "2.0.1-incubating",
    "2.0.0-incubating",
    "2.0.0-rc1-incubating",
    "1.22.1-incubating",
    "1.22.0-incubating",
    "1.21.0-incubating",
    "1.20.0-incubating",
    "1.19.0-incubating"
]

export function ArchivedPulsarDownloadTable(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    const latestVersion = pulsarReleases[0]
    const releaseInfo = pulsarReleases.map((version) => ({
        version: version,
        binArchiveUrl: archiveUrl(version, "bin"),
        srcArchiveUrl: archiveUrl(version, "src"),
    }))
    const data = releaseInfo
        .filter((info) => info.version != latestVersion)
        .map((info) => {
            let sha = "sha512"
            if (info.version.includes("1.19.0-incubating") || info.version.includes("1.20.0-incubating")) {
                sha = "sha"
            }
            return {
                release: info.version,
                binary: info.binArchiveUrl,
                binaryText: `apache-pulsar-${info.version}-bin.tar.gz`,
                binaryAsc: `${info.binArchiveUrl}.asc`,
                binarySha: `${info.binArchiveUrl}.${sha}`,
                binaryShaText: `${sha}`,
                source: info.srcArchiveUrl,
                sourceText: `apache-pulsar-${info.version}-src.tar.gz`,
                sourceAsc: `${info.srcArchiveUrl}.asc`,
                sourceSha: `${info.srcArchiveUrl}.${sha}`,
                sourceShaText: `${sha}`,
                releaseNote: !legacyReleaseNoteVersions.includes(info.version)
                    ? `${siteConfig.baseUrl}release-notes/versioned/pulsar-${info.version}`
                    : `${siteConfig.baseUrl}release-notes/legacy/#${info.version.replace(
                        /\./g,
                        ""
                    )}`,
            }
        })
    return <div className="tailwind">
        <OldReleaseTable data={data}></OldReleaseTable>
    </div>
}

export function CppReleasesDownloadTable(): JSX.Element {
    const data = cppReleases
        .map(item => item.tagName.substring(1))
        .filter(version => Number(version.split('.')[0]) >= 3)
        .map(version => {
            const url = `https://archive.apache.org/dist/pulsar/pulsar-client-cpp-${version}/`
            const tarPath = `${url}apache-pulsar-client-cpp-${version}.tar.gz`
            return {
                release: version,
                tarPath,
                tarText: `apache-pulsar-client-cpp-${version}.tar.gz`,
                tarAsc: `${tarPath}.asc`,
                tarSha: `${tarPath}.sha512`,
                directory: url,
                releaseNote: `https://github.com/apache/pulsar-client-cpp/releases/tag/v${version}`,
                binariesHint: "Pre-built DEB, RPM and APK packages (where published) live alongside the source tarball in the directory above.",
            }
        })
    return <div className="tailwind">
        <ClientReleasesTable data={data}></ClientReleasesTable>
    </div>
}

export function GoReleasesDownloadTable(): JSX.Element {
  const data = goReleases
    .map(item => item.tagName.substring(1))
    .map(version => {
      const url = `https://archive.apache.org/dist/pulsar/pulsar-client-go-${version}/`
      const tarPath = `${url}apache-pulsar-client-go-${version}-src.tar.gz`
      return {
        release: version,
        tarPath,
        tarText: `apache-pulsar-client-go-${version}-src.tar.gz`,
        tarAsc: `${tarPath}.asc`,
        tarSha: `${tarPath}.sha512`,
        directory: url,
        releaseNote: `https://github.com/apache/pulsar-client-go/releases/tag/v${version}`,
      }
    })
  return <div className="tailwind">
    <ClientReleasesTable data={data}></ClientReleasesTable>
  </div>
}

export function NodeReleasesDownloadTable(): JSX.Element {
  // Releases omitted here never shipped under the current ASF path
  // `dist/pulsar/pulsar-client-node/pulsar-client-node-<version>/` with the matching tarball name.
  // Extend only after checking https://archive.apache.org/dist/pulsar/pulsar-client-node/ (or HEAD on the tarball URL).
  const excludedVersions = ["1.0.0", "1.1.0", "1.2.0", "1.3.0", "1.3.1", "1.4.0", "1.3.2", "1.6.2", "1.5.0", "1.4.1"];
  const data = nodeReleases
    .map(item => item.tagName.substring(1))
    .filter(version => !excludedVersions.includes(version))
    .map(version => {
      const url = `https://archive.apache.org/dist/pulsar/pulsar-client-node/pulsar-client-node-${version}/`
      const tarPath = `${url}apache-pulsar-client-node-${version}.tar.gz`
      return {
        release: version,
        tarPath,
        tarText: `apache-pulsar-client-node-${version}.tar.gz`,
        tarAsc: `${tarPath}.asc`,
        tarSha: `${tarPath}.sha512`,
        directory: url,
        releaseNote: `https://github.com/apache/pulsar-client-node/releases/tag/v${version}`,
        binariesHint:
          "Platform-specific napi prebuilts (darwin/linux/win, arm64/x64, glibc/musl) are published alongside the source tarball in the directory above. If a direct tarball link fails, use the expanded directory listing for the authoritative file set.",
      }
    })
  return <div className="tailwind">
    <ClientReleasesTable data={data}></ClientReleasesTable>
  </div>
}

export function PythonReleasesDownloadTable(): JSX.Element {
  const data = pythonReleases
    .map(item => item.tagName.substring(1))
    .filter(version => Number(version.split('.')[0]) >= 3)
    .map(version => {
      const url = `https://archive.apache.org/dist/pulsar/pulsar-client-python-${version}/`
      const tarPath = `${url}pulsar-client-python-${version}.tar.gz`
      return {
        release: version,
        tarPath,
        tarText: `pulsar-client-python-${version}.tar.gz`,
        tarAsc: `${tarPath}.asc`,
        tarSha: `${tarPath}.sha512`,
        directory: url,
        releaseNote: `https://github.com/apache/pulsar-client-python/releases/tag/v${version}`,
      }
    })
  return <div className="tailwind">
    <ClientReleasesTable data={data}></ClientReleasesTable>
  </div>
}

export function CurrentPulsarAdaptersDownloadTable(): JSX.Element {
    const latestPulsarAdaptersVersion = pulsarAdaptersReleases[0]
    const data = [
        {
            release: latestPulsarAdaptersVersion,
            link: getLatestAdaptersMirrorUrl(latestPulsarAdaptersVersion),
            linkText: `apache-pulsar-adapters-${latestPulsarAdaptersVersion}-src.tar.gz`,
            asc: `${distAdaptersUrl(latestPulsarAdaptersVersion)}.asc`,
            sha512: `${distAdaptersUrl(latestPulsarAdaptersVersion)}.sha512`,
        },
    ]
    return <div className="tailwind">
        <ReleaseTable data={data}></ReleaseTable>
    </div>
}

export function ArchivedPulsarAdaptersDownloadTable(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    const latestPulsarAdaptersVersion = pulsarAdaptersReleases[0]
    const pulsarAdaptersReleaseInfo = pulsarAdaptersReleases.map((version) => ({
        version: version,
        srcArchiveUrl: distAdaptersUrl(version),
    }))
    const data = pulsarAdaptersReleaseInfo
        .filter((info) => info.version !== latestPulsarAdaptersVersion)
        .map((info) => {
            const sha = "sha512";
            return {
                release: info.version,
                link: info.srcArchiveUrl,
                linkText: `apache-pulsar-adapters-${info.version}-src.tar.gz`,
                asc: `${info.srcArchiveUrl}.asc`,
                sha512: `${info.srcArchiveUrl}.${sha}`,
            };
        })
    return <div className="tailwind">
        <ReleaseTable data={data}></ReleaseTable>
    </div>
}

export function CurrentPulsarManagerDownloadTable(): JSX.Element {
    const latestPulsarManagerVersion = pulsarManagerReleases[0]
    const latestPulsarManagerArchiveMirrorUrl = getLatestPulsarManagerArchiveMirrorUrl(latestPulsarManagerVersion, "bin")
    const latestPulsarManagerSrcArchiveMirrorUrl = getLatestPulsarManagerArchiveMirrorUrl(latestPulsarManagerVersion, "src")
    const pulsarManagerLatestArchiveUrl = pulsarManagerDistUrl(latestPulsarManagerVersion, "bin")
    const pulsarManagerLatestSrcArchiveUrl = pulsarManagerDistUrl(latestPulsarManagerVersion, "src")
    const data = [
        {
            release: "Binary",
            link: latestPulsarManagerArchiveMirrorUrl,
            linkText: `apache-pulsar-manager-${latestPulsarManagerVersion}-bin.tar.gz`,
            asc: `${pulsarManagerLatestArchiveUrl}.asc`,
            sha512: `${pulsarManagerLatestArchiveUrl}.sha512`,
        },
        {
            release: "Source",
            link: latestPulsarManagerSrcArchiveMirrorUrl,
            linkText: `apache-pulsar-manager-${latestPulsarManagerVersion}-src.tar.gz`,
            asc: `${pulsarManagerLatestSrcArchiveUrl}.asc`,
            sha512: `${pulsarManagerLatestSrcArchiveUrl}.sha512`,
        },
    ]
    return <div className="tailwind">
        <ReleaseTable data={data}></ReleaseTable>
    </div>
}

export function ArchivedPulsarManagerDownloadTable(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    const latestPulsarManagerVersion = pulsarManagerReleases[0]
    const pulsarManagerReleaseInfo = pulsarManagerReleases.map((version) => ({
        version: version,
        binArchiveUrl: pulsarManagerArchiveUrl(version, "bin"),
        srcArchiveUrl: pulsarManagerArchiveUrl(version, "src"),
    }))
    const data = pulsarManagerReleaseInfo
        .filter((info) => info.version !== latestPulsarManagerVersion)
        .map((info) => {
            const sha = "sha512";
            return {
                release: info.version,
                binary: info.binArchiveUrl,
                binaryText: `apache-pulsar-manager-${info.version}-bin.tar.gz`,
                binaryAsc: `${info.binArchiveUrl}.asc`,
                binarySha: `${info.binArchiveUrl}.${sha}`,
                binaryShaText: `${sha}`,
                source: info.srcArchiveUrl,
                sourceText: `apache-pulsar-manager-${info.version}-src.tar.gz`,
                sourceAsc: `${info.srcArchiveUrl}.asc`,
                sourceSha: `${info.srcArchiveUrl}.${sha}`,
                sourceShaText: `${sha}`,
                releaseNote: `${siteConfig.baseUrl}release-notes#${
                    info.version
                }`,
            };
        })
    return <div className="tailwind">
        <OldReleaseTable data={data}></OldReleaseTable>
    </div>
}

function getLatestArchiveMirrorUrl(version, type) {
    return `https://www.apache.org/dyn/closer.lua/pulsar/pulsar-${version}/apache-pulsar-${version}-${type}.tar.gz?action=download`;
}

function getLatestOffloadersMirrorUrl(version) {
    return `https://www.apache.org/dyn/closer.lua/pulsar/pulsar-${version}/apache-pulsar-offloaders-${version}-bin.tar.gz?action=download`;
}

function getLatestAdaptersMirrorUrl(version) {
    return `https://www.apache.org/dyn/closer.lua/pulsar/pulsar-adapters-${version}/apache-pulsar-adapters-${version}-src.tar.gz?action=download`;
}

function getLatestShellMirrorUrl(version, ext) {
    return `https://www.apache.org/dyn/closer.lua/pulsar/pulsar-${version}/apache-pulsar-shell-${version}-bin.${ext}?action=download`;
}

function distUrl(version, type) {
    return `https://downloads.apache.org/pulsar/pulsar-${version}/apache-pulsar-${version}-${type}.tar.gz`;
}

function distOffloadersUrl(version) {
    return `https://downloads.apache.org/pulsar/pulsar-${version}/apache-pulsar-offloaders-${version}-bin.tar.gz`;
}

function distAdaptersUrl(version) {
    return `https://downloads.apache.org/pulsar/pulsar-adapters-${version}/apache-pulsar-adapters-${version}-src.tar.gz`;
}

function distShellUrl(version, ext) {
    return `https://downloads.apache.org/pulsar/pulsar-${version}/apache-pulsar-shell-${version}-bin.${ext}`;
}

function archiveUrl(version, type) {
    if (version.includes("incubating")) {
        return `https://archive.apache.org/dist/incubator/pulsar/pulsar-${version}/apache-pulsar-${version}-${type}.tar.gz`;
    } else {
        return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-${version}-${type}.tar.gz`;
    }
}

function pulsarManagerArchiveUrl(version, type) {
    return `https://archive.apache.org/dist/pulsar/pulsar-manager/pulsar-manager-${version}/apache-pulsar-manager-${version}-${type}.tar.gz`;
}

function connectorDistUrl(name, version) {
    return `https://downloads.apache.org/pulsar/pulsar-${version}/connectors/pulsar-io-${name}-${version}.nar`;
}

function connectorDownloadUrl(name, version) {
    return `https://www.apache.org/dyn/closer.lua/pulsar/pulsar-${version}/connectors/pulsar-io-${name}-${version}.nar?action=download`;
}

function getLatestPulsarManagerArchiveMirrorUrl(version, type) {
    return `https://www.apache.org/dyn/closer.lua/pulsar/pulsar-manager/pulsar-manager-${version}/apache-pulsar-manager-${version}-${type}.tar.gz?action=download`;
}

function pulsarManagerDistUrl(version, type) {
    return `https://downloads.apache.org/pulsar/pulsar-manager/pulsar-manager-${version}/apache-pulsar-manager-${version}-${type}.tar.gz`;
}
