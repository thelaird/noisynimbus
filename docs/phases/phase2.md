# Phase 2: Uploading and listening to songs

## Rails
### Models
* Song

### Controllers
* Api::SongsController (create, destroy, edit, index, show)
* Users (show)


### Views
* users/show.json.jbuilder

## Backbone
### Models
* User (parses nested `songs` association)
* Song

### Collections
* Users
* Songs

### Views
* SongForm
* SongShow
* UserShow (composite view, contains SongItem subview)
* SongItem
* Player

## Gems/Libraries
* jPlayer
* aws-sdk
* jQuery-File-Upload
