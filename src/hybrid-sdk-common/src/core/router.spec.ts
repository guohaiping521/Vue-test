import {pageTo} from './router'
import * as sdk from './index'

jest.mock("./index");
jest.mock("../");

test("旧APP ZYB协议", () => {
  pageTo({
    url: 'zyb://hybrid-test/page/card?query=1'
  })
  expect(sdk.core_openWindow).toHaveBeenCalledTimes(1);
  expect(sdk.core_openWindow).toHaveBeenCalledWith({
    pageUrl: '/static/hy/hybrid-test/card.html?query=1'
  })
});

// const routerMapSampler = require("../../test/routerSample.json")

// test('route map', () => {
//     expect(router._pageTo({
//         module: "elearning-task",
//         page: "course-data",
//         params: "?id=fake"
//     }, ()=>{}, routerMapSampler))
//     .toBe("https:\/\/yy-s.zuoyebang.cc\/static\/hy\/elearning-task\/course-data-40b9a9d7-hycache.html?id=fake")
// }) 



// jest.mock('./index')
// core.getCommonParameters = jest.fn().mockResolvedValue({
//     appid:'airclass',
//     vc: '1.1.1'
// })