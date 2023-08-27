import React from 'react'
import pulsarReleases from '@site/releases.json'
import connectors from '@site/data/connectors'
import cppReleases from '@site/data/release-cpp'
import pulsarManagerReleases from '@site/data/release-pulsar-manager'
import pulsarAdaptersReleases from '@site/data/release-pulsar-adapters'
import ReleaseTable from "@site/src/components/ReleaseTable";
import ConnectorTable from "@site/src/components/ConnectorTable";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import OldReleaseTable from "@site/src/components/OldReleaseTable";

export function CurrentPulsarVersion(): JSX.Element {
    return <>{pulsarReleases[0]}</>
}

export function CurrentPulsarManagerVersion(): JSX.Element {
    return <>{pulsarManagerReleases[0]}</>
}

export function CurrentPulsarAdaptersVersion(): JSX.Element {
    return <>{pulsarAdaptersReleases[0]}</>
}

export function CurrentPulsarDownloadTable(): JSX.Element {
    const latestVersion = pulsarReleases[0]
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

export function CurrentPulsarOffloadersDownloadTable(): JSX.Element {
    const latestVersion = pulsarReleases[0]
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

export function CurrentPulsarConnectorsDownloadTable(): JSX.Element {
    const latestVersion = pulsarReleases[0]
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

export function CurrentPulsarShellDownloadTable(): JSX.Element {
    const latestVersion = pulsarReleases[0]
    const latestArchiveUrl = distShellUrl(latestVersion, "tar.gz")
    const latestArchiveUrlZip = distShellUrl(latestVersion, "zip")
    const data = [
        {
            release: "Linux / MacOS",
            link: latestArchiveUrl,
            linkText: `apache-pulsar-shell-${latestVersion}-bin.tar.gz`,
            asc: `${latestArchiveUrl}.asc`,
            sha512: `${latestArchiveUrl}.sha512`,
        },
        {
            release: "Windows",
            link: latestArchiveUrlZip,
            linkText: `apache-pulsar-shell-${latestVersion}-bin.zip`,
            asc: `${latestArchiveUrl}.asc`,
            sha512: `${latestArchiveUrl}.sha512`,
        }
    ]
    return <div className="tailwind">
        <ReleaseTable data={data}></ReleaseTable>
    </div>
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
            const tarPath = `${url}/apache-pulsar-client-cpp-${version}.tar.gz`
            return {
                release: version,
                link: url,
                linkText: `apache-pulsar-cpp-${version}`,
                asc: `${tarPath}.asc`,
                sha512: `${tarPath}.sha512`
            }
        })
    return <div className="tailwind">
        <ReleaseTable data={data}></ReleaseTable>
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
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-${version}/apache-pulsar-${version}-${type}.tar.gz`;
}

function getLatestOffloadersMirrorUrl(version) {
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-${version}/apache-pulsar-offloaders-${version}-bin.tar.gz`;
}

function getLatestAdaptersMirrorUrl(version) {
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-adapters-${version}/apache-pulsar-adapters-${version}-src.tar.gz`;
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
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-${version}/connectors/pulsar-io-${name}-${version}.nar`;
}

function getLatestPulsarManagerArchiveMirrorUrl(version, type) {
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-manager/pulsar-manager-${version}/apache-pulsar-manager-${version}-${type}.tar.gz`;
}

function pulsarManagerDistUrl(version, type) {
    return `https://downloads.apache.org/pulsar/pulsar-manager/pulsar-manager-${version}/apache-pulsar-manager-${version}-${type}.tar.gz`;
}
