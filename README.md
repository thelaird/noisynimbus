# NoisyNimbus

[Live link][live]

[live]: http://noisynimbus.com

## Description

NoisyNimbus is an online social audio platform inspired by SoundCloud, built using a Backbone.js front end with a Rails backend. Features:

- Custom Auth built in Rails to allow user sign-up and sign-in
- Generates pre-signed URLs to permit secure uploads directly to Amazon S3
- Utilizes jQuery deferred objects to coordinate multiple, concurrent AJAX requests
- Automatically populate album art from iTunes and Last.fm
- Song stream featuring songs uploaded by followed users
- Tag songs by genre, mood, etc and view all songs with a given tag
- Create custom playlists
- Fuzzy search for users, tags, and songs by both artist and title
- User avatars via Gravatar
- Media player can be embedded in third-party sites such as Tumblr

## Languages

- Ruby on Rails
- Backbone.js (Javascript, jQuery)
- SQL
- HTML
- CSS

## Technologies and libraries

- [Bootstrap][bootstrap]
- [Bootswatch][bootswatch]
- [Figaro][figaro]
- [S3Upload][s3upload]
- [SerializeJSON][serialize]
- [BCrypt][bcrypt]
- [MediaElement.js][mediaelement]
- [Fuzzily][fuzzily]
- [Gravtastic][gravtastic]
- [jQuery UI][jqueryui]

[bootstrap]: http://getbootstrap.com/
[bootswatch]: https://bootswatch.com/
[figaro]: https://github.com/laserlemon/figaro
[s3upload]: https://github.com/tadruj/s3upload-coffee-javascript
[serialize]: https://github.com/marioizquierdo/jquery.serializeJSON
[bcrypt]: https://github.com/codahale/bcrypt-ruby
[mediaelement]: http://mediaelementjs.com/
[fuzzily]: https://github.com/mezis/fuzzily
[gravtastic]: https://github.com/chrislloyd/gravtastic
[jqueryui]: https://jqueryui.com/

### Future Features

- [ ] Favorite songs
- [ ] Song comments
- [ ] Pagination/infinite scroll
- [ ] Reposting
- [ ] Expand activity feed to include followed users' favorites, playlists, etc
- [ ] Activity history (e.g. favorites, reposts, taggings)
- [ ] Typeahead search bar
- [ ] Recommended follows
