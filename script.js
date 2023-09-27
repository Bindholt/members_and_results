import { initTabs } from "./tabs.js";
import * as result from "./result.js";
import * as member from "./member.js";

window.addEventListener("load", initApp);

const results = [];
const members = [];


async function initApp() {
  	initTabs();
	await buildMembersList();
	await buildResultsList();
	displayResults();
	displayMembers();

  	// TODO: Make the rest of the program ...
}

async function fetchResults() {
	const resp = await fetch("/data/results.json");
	const resultsJson = await resp.json();
	return resultsJson;
}

async function fetchMembers() {
	const resp = await fetch("/data/members.json");
	const membersJson = await resp.json();
	return membersJson;
}

async function buildMembersList() {
	const originalObjects = await fetchMembers();

	for(const orgobj of originalObjects) {
		const memberObj = member.construct(orgobj);
		members.push(memberObj);
	}
}
  
async function buildResultsList() {
	const originalObjects = await fetchResults();
  
	for(const orgobj of originalObjects) {
		const memberObj = members.find((obj) => obj.id === orgobj.memberId);
		if (memberObj) {
			const resultObj = result.construct(orgobj, memberObj);
			results.push(resultObj);	
		}
	}
}

function displayResults() {
	const table = document.querySelector("table#results tbody");
	table.innerHTML = "";
	
	for(const result of results) {
		console.log(result)
	  	const html = /*html*/`
	  	<tr>
			<td>${result.date}</td>
			<td>${result.name}</td>
			<td>${result.discipline}</td>
			<td>${result.resultType}</td>
			<td>${result.time}</td>
	  	</tr>`;
  
	  	table.insertAdjacentHTML("beforeend", html);
	}
}

function displayMembers() {
	const table = document.querySelector("table#members tbody");
	table.innerHTML = "";

	for(const member of members) {
		const html = /*html*/`
	  	<tr>
			<td>${member.name}</td>
			<td>${member.isActiveMember}</td>
			<td>${member.dateOfBirth}</td>
			<td>${member.age}</td>
			<td>${member.group}</td>
	  	</tr>`;
  
		table.insertAdjacentHTML("beforeend", html);
	}
}