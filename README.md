# NoisyNimbus

[Heroku link][heroku]

[heroku]: http://noisynimbus.com

## Minimum Viable Product
NoisyNimbus is an online social audio platform inspired by SoundCloud. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create sessions (log in)
- [X] Upload songs
- [X] Listen to songs
- [ ] Follow other users
- [ ] View a feed of followed users' activity
- [ ] Create playlists
- [ ] Tag songs
- [ ] Search for songs by title
- [ ] Search for songs by tag

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~ 1/2 day)
I will implement user authentication in Rails based on practices learned at App
Academy. At the end of this phase, users will be able to sign up and log in.
This phase will also be used to push to Heroku and ensure everything is running
properly there before continuing.


[Details][phase-one]

### Phase 2: Uploading and listening to songs (~2 days)
Phase 2 will add routes, models, and collections for song data. I will use
Amazon S3 for storage and a third-party library for the audio player. By the
end of this phase, users will be able upload songs and listen to their songs. A
`SongShow` view will be used to display full details of the song. The audio
player will be rendered in a `Player` view and will persist throughout the site.

[Details][phase-two]

### Phase 3: Follow Users and Activity Feed (~2 days)
I will add the ability to follow other users. Each user will also get an activity
feed consisting of recently uploaded songs from users they are following. On the
Rails side, there will be a `feed` route using the `current_user`'s
`followed_users` association to deliver a list of songs ordered chronologically.
In Backbone, a `FeedShow` view will render multiple `SongItem` subviews to display the
feed upon login. The `SongItem` view will contain limited information about the
song and a play button to begin playback.

[Details][phase-three]

### Phase 4: Playlists (~1 day)
Users will be able to create playlists and add songs to the playlists. Playlists
will make use of the `SongItem` view to display song information.

[Details][phase-four]

### Phase 5: Song tags (~1 day)
Users will be able to tag songs by genre, mood, etc. Rails will use a `Tag` model
while in Backbone, the `SongForm` view will be used to add/remove tags and tags
will be listed on `SongShow` view.

[Details][phase-five]

### Phase 6: Searching for Songs (~2 days)
In Rails, I'll add a `search` route to the Songs controller and Backbone will use
a `SearchResults` view to display the results and their `SongItem` subviews.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Favorite songs
- [ ] Song comments
- [ ] Pagination/infinite scroll
- [ ] Reposting
- [ ] Expand activity feed to include followed users' favorites, playlists, etc
- [ ] Activity history (e.g. favorites, reposts, taggings)
- [ ] User avatars
- [ ] Typeahead search bar
- [ ] Embeddable audio player
- [ ] Recommended follows

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
