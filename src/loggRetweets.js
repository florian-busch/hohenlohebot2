require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION);

//get mongoose Schema for retweets
const { retweetSchema } = require('./schemas/retweetsSchema');
const { loggErrors } = require('./loggErrors');
const { currentDateAndTime } = require('./helpers')

//create mongoose model
const retweetModel = mongoose.model('testRetweets', retweetSchema);

const loggRetweets = tweet => {
    console.log(tweet)
    const newRetweet = new retweetModel({
        created_at: currentDateAndTime(),
        id: tweet.id,
        id_str: tweet.id_str,
        text: tweet.text,
        truncated: tweet.truncated,
        entities: { 
            hashtags: tweet.entities.hashtags,
            symbols: tweet.entities.symbols,
            user_mentions: tweet.entities.user_mentions,
            urls: tweet.entities.urls
        },
        source: tweet.source,
        in_reply_to_status_id: tweet.in_reply_to_status_id,
        in_reply_to_status_id_str: tweet.in_reply_to_status_id_str,
        in_reply_to_user_id: tweet.in_reply_to_user_id,
        in_reply_to_user_id_str: tweet.in_reply_to_user_id_str,
        in_reply_to_screen_name: tweet.in_reply_to_screen_name,
        user: {
            id: tweet.user.id,
            id_str: tweet.user.id_str,
            name: tweet.user.name,
            screen_name: tweet.user.screen_name,
            location: tweet.user.location,
            description: tweet.user.description,
            url: tweet.user.url,
            entities: {
                description: tweet.user.entities.description
            },
            protected: tweet.user.protected,
            followers_count: tweet.user.followers_count,
            friends_count: tweet.user.friends_count,
            listed_count: tweet.user.listed_count,
            created_at: tweet.user.created_at,
            favourites_count: tweet.user.favorite_count,
            utc_offset: tweet.user.utc_offset,
            time_zone: tweet.user.time_zone,
            geo_enabled: tweet.user.geo_enabled,
            verified: tweet.user.verified,
            statuses_count: tweet.user.statuses_count,
            lang: tweet.user.lang,
            contributors_enabled: tweet.user.contributors_enabled,
            is_translator: tweet.user.is_translator,
            is_translation_enabled: tweet.user.is_translation_enabled,
            profile_background_color: tweet.user.profile_background_color,
            profile_background_image_url: tweet.user.profile_background_image_url,
            profile_background_image_url_https: tweet.user.profile_background_image_url_https,
            profile_background_tile: tweet.user.profile_background_tile,
            profile_image_url: tweet.user.profile_image_url,
            profile_image_url_https: tweet.user.profile_background_image_url_https,
            profile_banner_url: tweet.user.profile_banner_url,
            profile_link_color: tweet.user.profile_link_color,
            profile_sidebar_border_color: tweet.user.profile_sidebar_border_color,
            profile_sidebar_fill_color: tweet.user.profile_sidebar_fill_color,
            profile_text_color: tweet.user.profile_text_color,
            profile_use_background_image: tweet.user.profile_use_background_image,
            has_extended_profile: tweet.user.has_extended_profile,
            default_profile: tweet.user.default_profile,
            default_profile_image: tweet.user.default_profile_image,
            following: tweet.user.following,
            follow_request_sent: tweet.user.follow_request_sent,
            notifications: tweet.user.notifications,
            translator_type: tweet.user.translator_type,
            withheld_in_countries: tweet.user.withheld_in_countries
        },
        geo: tweet.geo,
        coordinates: tweet.coordinates,
        place: tweet.place,
        contributors: tweet.contributors,
        retweeted_status: {
            created_at: currentDateAndTime(),
            id: tweet.retweeted_status.id,
            id_str: tweet.retweeted_status.id_str,
            text: tweet.retweeted_status.text,
            truncated: tweet.retweeted_status.truncated,
            entities: {
                hashtags: tweet.retweeted_status.entities.hashtags,
                symbols: tweet.retweeted_status.entities.symbols,
                user_mentions: tweet.retweeted_status.entities.user_mentions,
                urls: tweet.retweeted_status.entities.urls
            },
            source: tweet.retweeted_status.source,
            in_reply_to_status_id: tweet.retweeted_status.in_reply_to_status_id,
            in_reply_to_status_id_str: tweet.retweeted_status.in_reply_to_status_id_str,
            in_reply_to_user_id: tweet.retweeted_status.in_reply_to_user_id,
            in_reply_to_user_id_str: tweet.retweeted_status.in_reply_to_user_id_str,
            in_reply_to_screen_name: tweet.retweeted_status.in_reply_to_screen_name,
            user: {
                id: tweet.retweeted_status.user.id,
                id_str: tweet.retweeted_status.user.id_str,
                name: tweet.retweeted_status.user.name,
                screen_name: tweet.retweeted_status.user.screen_name,
                location: tweet.retweeted_status.user.location,
                description: tweet.retweeted_status.user.description,
                url: tweet.retweeted_status.user.url,
                entities: tweet.retweeted_status.user.entities,
                protected: tweet.retweeted_status.user.protected,
                followers_count: tweet.retweeted_status.user.followers_count,
                friends_count: tweet.retweeted_status.user.friends_count,
                listed_count: tweet.retweeted_status.user.friends_count,
                created_at: tweet.retweeted_status.user.created_at,
                favourites_count: tweet.retweeted_status.user.favorite_count,
                utc_offset: tweet.retweeted_status.user.utc_offset,
                time_zone: tweet.retweeted_status.user.time_zone,
                geo_enabled: tweet.retweeted_status.user.geo_enabled,
                verified: tweet.retweeted_status.user.verified,
                statuses_count: tweet.retweeted_status.user.statuses_count,
                lang: tweet.retweeted_status.user.lang,
                contributors_enabled: tweet.retweeted_status.user.contributors_enabled,
                is_translator: tweet.retweeted_status.user.is_translator,
                is_translation_enabled: tweet.retweeted_status.user.is_translation_enabled,
                profile_background_color: tweet.retweeted_status.user.profile_background_color,
                profile_background_image_url: tweet.retweeted_status.user.profile_background_image_url,
                profile_background_image_url_https: tweet.retweeted_status.user.profile_background_image_url_https,
                profile_background_tile: tweet.retweeted_status.user.profile_background_tile,
                profile_image_url: tweet.retweeted_status.user.profile_image_url,
                profile_image_url_https: tweet.retweeted_status.user.profile_image_url_https,       
                profile_link_color: tweet.retweeted_status.user.profile_link_color,
                profile_sidebar_border_color: tweet.retweeted_status.user.profile_sidebar_border_color,
                profile_sidebar_fill_color: tweet.retweeted_status.user.profile_sidebar_fill_color,
                profile_text_color: tweet.retweeted_status.user.profile_text_color,
                profile_use_background_image: tweet.retweeted_status.user.profile_use_background_image,
                has_extended_profile: tweet.retweeted_status.user.has_extended_profile,
                default_profile: tweet.retweeted_status.user.default_profile,
                default_profile_image: tweet.retweeted_status.user.default_profile_image,
                following: tweet.retweeted_status.user.following,
                follow_request_sent: tweet.retweeted_status.user.follow_request_sent,
                notifications: tweet.retweeted_status.user.notifications,
                translator_type: tweet.retweeted_status.user.translator_type,
                withheld_in_countries: tweet.retweeted_status.user.withheld_in_countries
            },
            geo: tweet.retweeted_status.geo,
            coordinates: tweet.retweeted_status.coordinates,
            place: tweet.retweeted_status.place,
            contributors: tweet.retweeted_status.contributors,
            is_quote_status: tweet.retweeted_status.is_quote_status,
            retweet_count: tweet.retweeted_status.retweet_count,
            favorite_count: tweet.retweeted_status.favorite_count,
            favorited: tweet.retweeted_status.favorited,
            retweeted: tweet.retweeted_status.retweeted,
            lang: tweet.retweeted_status.lang
        },
        is_quote_status: tweet.is_quote_status,
        retweet_count: tweet.retweet_count,
        favorite_count: tweet.favorite_count,
        favorited: tweet.favorited,
        retweeted: tweet.retweeted,
        lang: tweet.lang
    });
   
    newRetweet.save()
    .then(response => console.log(response))
    .catch(err => loggErrors( {category: 'RetweetSave', message: err, tweet: tweet } ));
};

module.exports = { loggRetweets };