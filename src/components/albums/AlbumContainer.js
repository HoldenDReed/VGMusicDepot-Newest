import { useState } from "react"
import { AlbumList } from "./AlbumsList"
import { AlbumSearch } from "./AlbumSearch"

export const AlbumContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return  <>
        <AlbumSearch  setterFunction={setSearchTerms} />
        <AlbumList searchTermState={searchTerms} />
        <footer className="secretFooter">
            **Try the Konami code for a secret!**
        </footer>
    </>
}
