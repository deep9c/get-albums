var React = require('react');
var PropTypes = require('prop-types');

function sortAlbums(albums){
	return albums.sort(function(a,b){
		//return b.releaseDate - a.releaseDate;

		var nameA=a.releaseDate.toLowerCase(), nameB=b.releaseDate.toLowerCase()
    	if (nameA < nameB) //sort string ascending
	        return -1 
	    if (nameA > nameB)
        	return 1
    	return 0 //default return value (no sorting)

	});
}

function Album(props){
	var sortedAlbums = sortAlbums(props.albums);
	return(
		<div>
		
		<center> {props.artistName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})} </center>
		{props.children}
		<ul className='popular-list'>
			{	
				sortedAlbums.map(function(album,index){
				return(
				<li key={album.collectionId} className='popular-item'>
					<div className='popular-rank'># {index+1}</div>
					<ul className='space-list-items'>
						<li> 
							<img className='avatar' 
								src={album.artworkUrl100} 
								alt={'Avatar for ' + album.collectionCensoredName}/>
						</li>
						<li><a href={album.collectionViewUrl}>{album.collectionCensoredName}</a></li>
						<li>Artist: {album.artistName}</li>	
						<li>Released: {album.releaseDate.substring(0,4)}</li>						
					</ul>
				</li>
				)
			})}
		</ul>
		</div>
	)

}
Album.propTypes = {
	albums: PropTypes.array.isRequired,
	artistName: PropTypes.string.isRequired,
	//id: PropTypes.string.isRequired,
	//onReset: PropTypes.func.isRequired
}

module.exports=Album;