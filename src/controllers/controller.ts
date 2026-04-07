import { Context } from "hono";
import {
  scrapeEvent,
  scrapeEvents,
  scrapeMatch,
  scrapeMatchResults,
  scrapePlayers,
  scrapeTeams,
  scrapeUpcomingMatches,
} from "../services/scraper.js";

// @desc   GET rankings
// @route  GET /api/rankings/:region
// @access Public
export const getRankings = async (c: Context) => {
  const region = c.req.param("region");
  const rankings = await scrapeTeams(region);
  return c.json(rankings, 200);
};

// @desc   GET players
// @route  GET /api/players
// @access Public
export const getPlayers = async (c: Context) => {
  const players = await scrapePlayers();
  return c.json(players, 200);
};

// @desc   GET events
// @route  GET /api/events
// @access Public
export const getEvents = async (c: Context) => {
  const events = await scrapeEvents();
  return c.json(events, 200);
};

// @desc   GET event
// @route  GET /api/events/:url
// @access Public
export const getEvent = async (c: Context) => {
  const url = c.req.param("url");
  const event = await scrapeEvent(url);
  return c.json(event, 200);
};

// @desc   GET upcoming matches
// @route  GET /api/matches/upcoming
// @access Public
export const getUpcomingMatches = async (c: Context) => {
  const upcomingMatches = await scrapeUpcomingMatches();
  return c.json(upcomingMatches, 200);
};

// @desc   GET match results
// @route  GET /api/matches/results
// @access Public
export const getMatchResults = async (c: Context) => {
  const matchResults = await scrapeMatchResults();
  return c.json(matchResults, 200);
};

// @desc   GET match
// @route  GET /api/matches/:url
// @access Public
export const getMatch = async (c: Context) => {
  const url = c.req.param("url");
  const match = await scrapeMatch(url);
  return c.json(match, 200);
};
