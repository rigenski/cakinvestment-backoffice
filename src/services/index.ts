import * as akademi from "./master-data/akademi";
import * as event from "./master-data/event";
import * as research from "./master-data/research";
import * as storage from "./storage";
import * as news from "./master-data/news";
import * as signal from "./master-data/signal";

export const services = {
    masterData: {
        akademi,
        event,
        research,
        news,
        signal,
    },
    storage,
};
