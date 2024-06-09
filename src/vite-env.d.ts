/// <reference types="vite/client" />

declare module 'valtio' {
	function useSnapshot<T extends object>( p: T ): T
}
