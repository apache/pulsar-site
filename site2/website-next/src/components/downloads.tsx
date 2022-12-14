import React from 'react'
import pulsarReleases from '@site/releases.json'
import pulsarManagerReleases from '@site/pulsar-manager/pulsar-manager-release.json'
import pulsarAdaptersReleases from '@site/pulsar-manager/pulsar-adapters-release.json'
import ReleaseTable from "@site/src/components/ReleaseTable";

export function CurrentPulsarVersion(): JSX.Element {
    return <>{pulsarReleases[0]}</>
}

export function CurrentPulsarManagerVersion(): JSX.Element {
    return <>{pulsarManagerReleases[0]}</>
}

export function CurrentPulsarAdapterVersion(): JSX.Element {
    return <>{pulsarAdaptersReleases[0]}</>
}

export function CurrentPulsarVersionTable(): JSX.Element {
    const latestVersion = pulsarReleases[0]
    const latestArchiveMirrorUrl = getLatestArchiveMirrorUrl(latestVersion, "bin")
    const latestSrcArchiveMirrorUrl = getLatestArchiveMirrorUrl(latestVersion, "src")
    const latestArchiveUrl = distUrl(latestVersion, "bin")
    const latestSrcArchiveUrl = distUrl(latestVersion, "src")
    const latest = [
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
    ];
    return <ReleaseTable data={latest}></ReleaseTable>
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