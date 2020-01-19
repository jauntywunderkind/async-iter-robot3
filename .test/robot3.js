#!/usr/bin/env node
import Immediate from "p-immediate"
import tape from "tape"

import Robot3 from "../robot3.js"
import trafficLight from "./_fixture_traffic.js"

/**
* This test walks through traffic light
*/
tape( "synchronous walk of traffic light", async function( t){
	const light= new Robot3( trafficLight)
	t.equal( light.current, "green", "green")
	light.send( "step")
	t.equal( light.current, "yellow", "yellow")
	await Immediate()
	t.equal( light.current, "red", "red")
	t.end()
})
