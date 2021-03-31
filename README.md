<h1><img alt="Singagon" src="./src/images/logo.svg" height="24" />&nbsp;Singagon</h1>

> I don't know about you, but I love when multiple singers collaborate on a song. Unfortunately, most lyrics sites and apps show all the lines without any indication of who sings which. This is where Singagon comes in.

In other words: Karaoke with multiple voices, perfect for sing-alongs.

## The Why
I don't know. I was listening to some music while working and the procrastination hit me hard, so I got working on this idea that I had the previous day. Will it ever be used? Maybe. But I don't need people to know about this, it's enough that I had a good time, learnt some stuff along the way, and people's enjoyment would be just a bonus.
## The How
The app is designed to work purely from JSONs and pictures. For every song there is a [JSON](./songs/sweater-weather-khs-alyson-stoner-max.json) and for every singer there is their [photo](./artists/max-schneider.png). This then flows through [Gatsby](https://gatsbyjs.org)'s SSR and pops out a page for each song with the lyrics and photos and nice transitions and indications of who is singing. And I also threw in an animated background (using [p5.js](https://p5js.org)) for good measure. So, how does it work?

- Step 1: Take a JSON.  
- Step 2: Do some transformations to make it renderable.  
- Step 3: Perform an embarassing amount of logic to smoothly transition between the lines.  
- Step 4: Sing like noone's watching*!

See? Not that hard. (read: <small>THIS IS STUPIDLY OVERCOMPLICATED WHAT DID I GET MYSELF INTO?!</small>)

<small>*<sup>)</sup> People may not be watching, but there is likely someone listening. But who cares? Enjoy music, enjoy life!</small>

## Usage/User manual
First step is to open up [Singagon](https://webapps.mciesla.cz/singagon). There you can either pick a song from the select few or go to [Sing](https://webapps.mciesla.cz/singagon/sing) and look (or search) through all of them. Once you find the one you want, just click it and you will be transported to the sing-along.

From there, you can either start singing if you already have the song playing, or you can click one of the links on the right to open the song. Once you've got the music part, sing-along starts!

Simply press <kbd>Space</kbd>, <kbd>DownArrow</kbd> or scroll down to advance to the next line or press <kbd>UpArrow</kbd> or scroll up to go back. You can click the _Reset_ button on the right to quickly go back to the top. Once you reach the end of the song, you can go down one more time to see a couple of other songs you can go to.

The top bar shows the song name and artists (along with links to their social media profiles). Hovering over the top bar will reveal a way back to the song list.

## Contributing
I will be adding songs I like and songs that I've been asked to add, but if you want to help me or add your fave song, be my guest!

I don't have everything ready yet, but once I have the environments set up everyone will be able to create a pull request with a song. Then it will get sent to staging on Vercel and when enough songs are added and verified, I will push them to the main app.

I will be honest here, I don't really know what the GitHub flow for submitting Pull Requests is, but I assume you fork the app, clone it to your computer, make the changes you want, commit and push and finally create the PR. But I could absolutely be wrong, so feel free to correct me. There will be four branches: `master` for full production build, `staging` for the Vercel staging environment, `app` for modifications to the core of the app and finally `songs` for all the song submissions.

### Adding songs
Every song is stored in a JSON in the [`songs`](./songs) directory. Before even attempting to add your own, check out [some](./songs/22-alex-goot-sam-tsui-atc-chrissy-costanza-king-the-kid-khs.json) [of](./songs/castle-on-the-hill-khs-diamond-white-mario-jose.json) [the](./songs/find-you-zedd-matthew-koma-miriam-bryant.json) [already](./songs/getaway-last-heroes-lunis.json) [made](./songs/just-a-dream-khs-christina-grimmie-sam-tsui.json) [songs](./songs/sweater-weather-khs-alyson-stoner-max.json), just so you know what to expect. Then create a new JSON file with an object root and specify the [`song`](./songs/song.json) schema like so:
```json
{
  "$schema": "https://raw.githubusercontent.com/Akimayo/singagon/master/songs/song.json"
}
```
If you're using a [smart editor](https://code.visualstudio.com), just use IntelliSense (<kbd>Ctrl</kbd>+<kbd>Space</kbd> or your platform's alternative) to fill out the whole song structure. Your editor should yell at you whenever there's something missing or in the wrong format.

Alternatively, you can open or download the schema yourself and read through it, but I honestly can't recommend it, it's a hassle to read (and even worse to write).

Whatever the case is, make sure you follow the schema and read through the descriptions of what each property means. If you're ever unsure, you can check the afformetioned already made songs.

Once you're done, save it to the [`songs`](./songs) directory with a name that contains all the keywords, separated by dashes to keep it consistent. The app uses filenames for searching in the songs, so include all the artists, the song name, artist shortened names (like _ATC_ for _Against The Current_ or _KHS_ for _Kurt Hugo Schneider_). If you forget some, no big deal, just type in whatever you want to be able to find the song under when you search for it. (I am too lazy to write out `...-kurt-hugo-schneider-...`, so I don't, so there's that.)

One important thing to note here: **Copying**. You should never copy lyrics from other sites providing song lyrics (mainly because of copyrights). If there are official lyrics, like there sometimes are in the descriptions of YouTube music videos, that is the most accurate source you can get, but still, don't copy. The reason is, we don't want to provide just linear lyrics, there are other great services for that. We here want the individual voices and background vocals and whatnot. Therefore, do your best to rewrite what you hear rather than what you see.
### Adding artist photos
Artist photos are kinda essential to the whole idea of this app. So here are some rules on how to get the photos.

- **Copyrigts:** You should always respect the license the photographer published the photo under. The minimum we need to for our purposes is _Free to modify, share and use_. _Public domain_ would be great, but there aren't that many of these available, especially of smaller creators.
- **Image format:** Portrait pictures of the artists are the intended format, but I understand edge cases are inevitable (like bands, which usually make for a wide photo - not ideal). Once you locate a suitable photo, load it up in your favourite image manipulation software (I use [Paint.NET](https://getpaint.net/), which is free), crop the photo to the absolute minimum, and remove the background. Then save it as a PNG or WEBP image and add it to the [`artists`](./artists) directory, where you can also find some examples.

If there already exists the photo of an artist featured in the song you are adding, you can just use it in the JSON and skip the whole hassle of searching for and editing the photo. But if you want to add a different photo for your song, feel free to! Just make sure to give it a unique name not to override someone else's work.