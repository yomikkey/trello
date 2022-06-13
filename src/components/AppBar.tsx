import React, { useEffect } from 'react'

const AppBar = () => {

    useEffect(() => {
        document.title = 'Trello App'; // Set the document title
    }, [])

    return (
        <div className="App-header">
            <span className='PageTitle'>Trello-Clone</span>
            <button className='Signout-button'>Sign Out</button>
        </div>
    )
}

export default AppBar