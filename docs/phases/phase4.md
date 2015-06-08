# Phase 4: Playlists

## Rails
### Models
* Playlist

### Controllers
* Api::PlaylistsController (create, destroy, show, update)

### Views
* playlists/show.json.jbuilder

## Backbone
### Models
* Playlist (parses nested `songs` association)

### Collections
* Playlists

### Views
* PlaylistForm
* PlaylistShow (composite view, contains SongItem subview)

## Gems/Libraries
