import {useLocation} from '@docusaurus/router'

export default function useLocationParentPath() {
    let {pathname} = useLocation()
    if (pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1)
    }
    return pathname.slice(0, pathname.lastIndexOf("/")) + "/"
}
