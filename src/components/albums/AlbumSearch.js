
export const AlbumSearch = ({ setterFunction }) => {
    return (
        <div className="searchBar">
            <label for="albumInput"> What album are you looking for?</label>

            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" id="albumInput" placeholder="Enter search terms" />
        </div>
    )
}