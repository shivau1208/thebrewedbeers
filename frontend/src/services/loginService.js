import { server } from "@/App";

export const VerifyAuthService = async () => {
	const response = await fetch(`${server}/protected`, {
		credentials: "include",
	});
	return response;
};

export const loginAuthService = async (data) => {
	const response = await fetch(`${server}/login`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	});
	return response;
};
export const signupAuthService = async (data) => {
	const response = await fetch(`${server}/signup`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(data),
	});
	return response;
};

export const oauthService = async (token) => {
	const response = await fetch(`${server}/oauth`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		credentials: "include",
	});
	return response;
};

export const logoutService = async () => {
	const res = await fetch(`${server}/logout`, {
		method: "POST",
		credentials: "include",
	});
	return res;
};
