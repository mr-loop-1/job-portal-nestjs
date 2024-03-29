import app from './app';
import db from './database';
import settings from './settings';
import services from './services';
import queue from './queue';
import cache from './cache';
import auth from './auth';
import mail from './mail';

export default [app, db, settings, services, queue, cache, auth, mail];
