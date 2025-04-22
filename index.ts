import { file } from "bun";
import * as fs from 'fs';  // Add this line at the top of your file

var store = require('app-store-scraper');

console.log('-- Information about the app: id343555245 aka DB Navigator --')
store.app({ id: 343555245 }).then(console.log).catch(console.log);
console.log('------------------------------------------------------')



function getReviews({ page = 1, country = 'de' }) {
    let rv = store.reviews({
        id: 343555245,
        sort: store.sort.RECENT,
        page: page,
        country: country,
    })
    return rv;
}

const countries: string[] = ['de', 'us', 'fr', 'it', 'es', 'nl', 'pl', 'se', 'no', 'dk', 'fi', 'at', 'ch', 'be', 'lu', 'pt', 'ie', 'gb', 'cz', 'sk', 'hu', 'ro', 'bg', 'hr', 'si', 'rs', 'gr', 'cy', 'mt', 'lt', 'lv', 'ee', 'sk', 'hu', 'ro', 'bg', 'hr', 'si', 'rs', 'gr', 'cy', 'mt', 'lt', 'lv', 'ee', 'sk', 'hu', 'ro', 'bg', 'hr', 'si', 'rs', 'gr', 'cy', 'mt', 'lt', 'lv', 'ee'];
const pages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
pages.forEach(page => {
    countries.forEach(country => {
        getReviews({ page, country })
            .then((reviews: any) => {
                // Create the filename based on country and page
                const filename = `data/${country}_${page}.json`;

                try {
                    // Convert the reviews to a JSON string with pretty formatting
                    const jsonContent = JSON.stringify(reviews, null, 2);

                    // Write the content to the file if string is not empty
                    if (jsonContent.length > 0) {
                        fs.writeFileSync(filename, jsonContent, 'utf8');
                    }
                    console.log(`Successfully wrote ${filename}`);
                } catch (error) {
                    console.error(`Error writing to ${filename}:`, error);
                }
            })
            .catch((error: any) => {
                console.error(`Error fetching reviews for ${country}, page ${page}:`, error);
            });
    });
});