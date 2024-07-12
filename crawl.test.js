import { test, expect } from "@jest/globals";
import { normalizeUrl,getUrlsFromInput } from "./crawl";

test("normalizes url", () => {
    expect(normalizeUrl("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test ("normalize " , () => {
    expect(normalizeUrl("https://localhost:3000/blog/")).toBe("localhost:3000/blog")
})

test("long url works", () => {
    expect(normalizeUrl("http://blog.boot.dev/new/blog/api/implementation/is/great/")).toBe("blog.boot.dev/new/blog/api/implementation/is/great")
})

test("grabs url from dom", () => {
    expect(getUrlsFromInput("<html><body><a href='https://blog.boot.dev'><span>Go to Boot.dev</span></a><a href='https://theodinproject.com'></a></body></html>"))
    .toStrictEqual(["blog.boot.dev", "theodinproject.com"])
})