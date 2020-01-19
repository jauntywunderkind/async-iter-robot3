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

tape( "async walk of traffic light", async function( t){
	const
		light= new Robot3( trafficLight),
		expect= [ "yellow", "red", "green"],
		reader= (async function(){
			for await( let [ ctx, current] of light){
				const e= expect.shift()
				t.equal( current, e, e)
			}
		})()
	light.send( "step")
	await Immediate()
	light.send( "step")
	await Immediate()
	t.equal( expect.length, 0, "saw all")
	t.end()
})
