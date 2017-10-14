var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

var Album = require('./Album');


class PlayerInput extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		var value = event.target.value;
		this.setState(function(){
			return{
				username: value
			}
		})
	}

	handleSubmit(event){
		event.preventDefault;
		this.props.onSubmit(this.props.id, this.state.username);
	}

	render(){
		return(
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username'>
					{this.props.label}
				</label>
				<input
					id='username' 
					type='text'
					value={this.state.username}
					onChange={this.handleChange}
					placeholder='Enter artist name'
					autoComplete='off'
				/>
				<button
					type='submit'
					className='button'					
					disabled={!this.state.username}
				>
					Submit
				</button>	
				
			</form>
		)
	}

}
PlayerInput.propTypes={
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}


class Artist extends React.Component{
	constructor(props){
		super(props);

		this.state={
			artistName: '',
			albums: null,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(id, username){

		api.getAlbumsByArtist(username)
			.then(function(albums){
				console.log(albums)
				this.setState(function(){
					return{
						albums: albums.results
					}
				})

			}.bind(this));

		this.setState(function(){
			var newState = {};
			newState['artistName'] = username;
			
			//newState[id+'Image'] = 'https://github.com/'+username+'.png?size=200';
			return newState;
		});
	}

	handleReset(id){
		this.setState(function(){
			var newState = {};
			newState['artistName'] = '';
			newState['albums'] = null;
			return newState;
		});
	}

	render(){
		var match = this.props.match;
		var artistName = this.state.artistName;
		var albums = this.state.albums;

		return(
			<div className='container'>
				<div className='row'>
					{!artistName &&
						<PlayerInput 
							id='playerOne'
							label='Artist'
							onSubmit={this.handleSubmit} />
					}

					{albums != null &&
						<Album
							albums={albums}
							artistName={artistName}							
						>
							<button 
								className='reset' 
								onClick={this.handleReset.bind(null, 'playerOne')}
							>
								Reset
							</button>
						</Album>
					}					
				</div>
				
			</div>
		)
	}


}

module.exports = Artist;