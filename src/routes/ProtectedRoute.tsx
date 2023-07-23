import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApplicationStore } from "../store/store";

interface CustomRouteProps {
	element: JSX.Element;
	requiredRole?: string;
	needAuthorization: boolean;
}

const ProtectedRoute = ({
	element,
	requiredRole,
	needAuthorization,
}: CustomRouteProps) => {
	useEffect(() => {}, []);

	const user = useApplicationStore((state) => state.user);

	function isAuthenticated(): boolean {
		if (user == null) {
			toast.warning("Please login first!");
			return false;
		}
		return true;
	}
	if (!isAuthenticated() && needAuthorization) {
		return <Navigate to="/"></Navigate>;
	}
	function hasUserRole(role?: string): boolean {
		if (!user) return false;
		if (!role) return false;
		return user.role === role;
	}
	const userHasRole = hasUserRole(requiredRole);

	function userHasNoRole(): boolean {
		if (user != null && !userHasRole) {
			return true;
		}
		return false;
	}
	if (userHasNoRole() && requiredRole) {
		toast.warning("You do not have the appropriate role!");
		return <Navigate to="/"></Navigate>;
	}
	return element;
};

export default ProtectedRoute;
