#!/usr/bin/env node
import Immediate from "p-immediate"
import tape from "tape"

import Robot3 from "../robot3.js"
import trafficLight from "./_fixture_traffic.js"

tape( "robot3", async function( t){
	const light= new Robot3( trafficLight)
	t.equal( light.current, "green")
	light.send( "step")
	await Immediate()
	t.notEqual( light.current, "green")
	t.end()
})
