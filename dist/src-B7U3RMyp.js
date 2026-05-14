import { n as e, o as t } from "./chunk-foFoljWS.js";
import { t as n } from "./actions-lib.js";
import r from "node:path";
import { fileURLToPath as i } from "node:url";
//#region node_modules/@humanfs/core/src/hfs.js
function a(e) {
	if (!e || !(e instanceof URL) && typeof e != "string") throw TypeError("Path must be a non-empty string or URL.");
}
function o(e) {
	if (typeof e != "string" && !(e instanceof ArrayBuffer) && !ArrayBuffer.isView(e)) throw TypeError("File contents must be a string, ArrayBuffer, or ArrayBuffer view.");
}
function s(e) {
	if (e instanceof Uint8Array) return e;
	if (typeof e == "string") return l.encode(e);
	if (e instanceof ArrayBuffer) return new Uint8Array(e);
	if (ArrayBuffer.isView(e)) {
		let t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
		return new Uint8Array(t);
	}
	throw TypeError("Invalid contents type. Expected string or ArrayBuffer.");
}
var c, l, u, d, f, p, m, h = e((() => {
	c = new TextDecoder(), l = new TextEncoder(), u = class extends Error {
		constructor(e) {
			super(`Method "${e}" does not exist on impl.`);
		}
	}, d = class extends Error {
		constructor(e) {
			super(`Method "${e}" is not supported on this impl.`);
		}
	}, f = class extends Error {
		constructor() {
			super("Implementation already set.");
		}
	}, p = class {
		type;
		data;
		timestamp = Date.now();
		constructor(e, t) {
			this.type = e, this.data = t;
		}
	}, m = class {
		#e;
		#t;
		#n = /* @__PURE__ */ new Map();
		constructor({ impl: e }) {
			this.#e = e, this.#t = e;
		}
		#r(e, ...t) {
			for (let n of this.#n.values()) n.push(new p("call", {
				methodName: e,
				args: t
			}));
		}
		logStart(e) {
			if (!e || typeof e != "string") throw TypeError("Log name must be a non-empty string.");
			if (this.#n.has(e)) throw Error(`Log "${e}" already exists.`);
			this.#n.set(e, []);
		}
		logEnd(e) {
			if (this.#n.has(e)) {
				let t = this.#n.get(e);
				return this.#n.delete(e), t;
			}
			throw Error(`Log "${e}" does not exist.`);
		}
		isBaseImpl() {
			return this.#t === this.#e;
		}
		setImpl(e) {
			if (this.#r("implSet", e), this.#t !== this.#e) throw new f();
			this.#t = e;
		}
		resetImpl() {
			this.#r("implReset"), this.#t = this.#e;
		}
		#i(e) {
			if (typeof this.#t[e] != "function") throw new u(e);
		}
		#a(e, t) {
			if (typeof this.#t[e] != "function") throw new d(t);
		}
		#o(e, ...t) {
			return this.#r(e, ...t), this.#i(e), this.#t[e](...t);
		}
		#s(e, ...t) {
			return this.#i(e), this.#t[e](...t);
		}
		#c(e, t, ...n) {
			return this.#r(t, ...n), this.#a(e, t), this.#t[e](...n);
		}
		async text(e) {
			a(e);
			let t = await this.#c("bytes", "text", e);
			return t ? c.decode(t) : void 0;
		}
		async json(e) {
			a(e);
			let t = await this.#c("bytes", "json", e);
			return t ? JSON.parse(c.decode(t)) : void 0;
		}
		async arrayBuffer(e) {
			return a(e), (await this.#c("bytes", "arrayBuffer", e))?.buffer;
		}
		async bytes(e) {
			return a(e), this.#o("bytes", e);
		}
		async write(e, t) {
			a(e), o(t), this.#r("write", e, t);
			let n = s(t);
			return this.#s("write", e, n);
		}
		async append(e, t) {
			a(e), o(t), this.#r("append", e, t);
			let n = s(t);
			return this.#s("append", e, n);
		}
		async isFile(e) {
			return a(e), this.#o("isFile", e);
		}
		async isDirectory(e) {
			return a(e), this.#o("isDirectory", e);
		}
		async createDirectory(e) {
			return a(e), this.#o("createDirectory", e);
		}
		async delete(e) {
			return a(e), this.#o("delete", e);
		}
		async deleteAll(e) {
			return a(e), this.#o("deleteAll", e);
		}
		async *list(e) {
			a(e), yield* await this.#o("list", e);
		}
		async *walk(e, { directoryFilter: t = () => !0, entryFilter: n = () => !0 } = {}) {
			a(e), this.#r("walk", e, {
				directoryFilter: t,
				entryFilter: n
			});
			let r = async function* (e, { directoryFilter: t, entryFilter: n, parentPath: i = "", depth: a = 1 }) {
				let o;
				try {
					o = await this.#s("list", e);
				} catch (e) {
					if (e.code === "ENOENT") return;
					throw e;
				}
				for await (let s of o) {
					let o = {
						path: s.name,
						depth: a,
						...s
					};
					i && (o.path = `${i}/${o.path}`);
					let c = n(o);
					if (c.then && (c = await c), c && (yield o), s.isDirectory) {
						let i = t(o);
						if (i.then && (i = await i), !i) continue;
						yield* r(e instanceof URL ? new URL(s.name, e.href.endsWith("/") ? e.href : `${e.href}/`) : `${e.endsWith("/") ? e : `${e}/`}${s.name}`, {
							directoryFilter: t,
							entryFilter: n,
							parentPath: o.path,
							depth: a + 1
						});
					}
				}
			}.bind(this);
			yield* r(e, {
				directoryFilter: t,
				entryFilter: n
			});
		}
		async size(e) {
			return a(e), this.#o("size", e);
		}
		async lastModified(e) {
			return a(e), this.#o("lastModified", e);
		}
		async copy(e, t) {
			return a(e), a(t), this.#o("copy", e, t);
		}
		async copyAll(e, t) {
			return a(e), a(t), this.#o("copyAll", e, t);
		}
		async move(e, t) {
			return a(e), a(t), this.#o("move", e, t);
		}
		async moveAll(e, t) {
			return a(e), a(t), this.#o("moveAll", e, t);
		}
	};
})), g = e((() => {})), _ = e((() => {
	h(), g();
}));
//#endregion
//#region node_modules/@humanwhocodes/retry/dist/retrier.js
function v(e) {
	globalThis?.process?.env.DEBUG === "@hwc/retry" && console.debug(e);
}
function y(e, t) {
	let n = Date.now() - e.lastAttempt, r = Math.max(e.lastAttempt - e.timestamp, 1);
	return n >= Math.min(r * 1.2, t);
}
function b(e, t) {
	return e.age > t;
}
function x() {
	if (Promise.withResolvers) return Promise.withResolvers();
	let e, t, n = new Promise((n, r) => {
		e = n, t = r;
	});
	if (e === void 0 || t === void 0) throw Error("Promise executor did not initialize resolve or reject.");
	return {
		promise: n,
		resolve: e,
		reject: t
	};
}
var S, C, w, T, E, D = e((() => {
	S = 6e4, C = 100, w = 1e3, T = class {
		id = Math.random().toString(36).slice(2);
		fn;
		error;
		timestamp = Date.now();
		lastAttempt = this.timestamp;
		resolve;
		reject;
		signal;
		constructor(e, t, n, r, i) {
			this.fn = e, this.error = t, this.timestamp = Date.now(), this.lastAttempt = Date.now(), this.resolve = n, this.reject = r, this.signal = i;
		}
		get age() {
			return Date.now() - this.timestamp;
		}
	}, E = class {
		#e = [];
		#t = [];
		#n = 0;
		#r;
		#i;
		#a;
		#o;
		#s;
		constructor(e, { timeout: t = S, maxDelay: n = C, concurrency: r = w } = {}) {
			if (typeof e != "function") throw Error("Missing function to check errors");
			this.#o = e, this.#r = t, this.#i = n, this.#s = r;
		}
		get retrying() {
			return this.#e.length;
		}
		get pending() {
			return this.#t.length;
		}
		get working() {
			return this.#n;
		}
		#c(e, { signal: t, promise: n, resolve: r, reject: i }) {
			let a;
			try {
				a = e();
			} catch (e) {
				return i(Error(`Synchronous error: ${e.message}`, { cause: e })), n;
			}
			return !a || typeof a.then != "function" ? (i(/* @__PURE__ */ Error("Result is not a promise.")), n) : (this.#n++, n.finally(() => {
				this.#n--, this.#u();
			}).catch(() => {}), Promise.resolve(a).then((e) => {
				v("Function called successfully without retry."), r(e);
			}).catch((n) => {
				if (!this.#o(n)) {
					i(n);
					return;
				}
				let a = new T(e, n, r, i, t);
				v(`Function failed, queuing for retry with task ${a.id}.`), this.#e.push(a), t?.addEventListener("abort", () => {
					v(`Task ${a.id} was aborted due to AbortSignal.`), i(t.reason);
				}), this.#d();
			}), n);
		}
		retry(e, { signal: t } = {}) {
			t?.throwIfAborted();
			let { promise: n, resolve: r, reject: i } = x();
			return this.#t.push(() => this.#c(e, {
				signal: t,
				promise: n,
				resolve: r,
				reject: i
			})), this.#u(), n;
		}
		#l() {
			this.pending && this.#u(), this.retrying && this.#d();
		}
		#u() {
			v(`Processing pending tasks: ${this.pending} pending, ${this.working} working.`);
			let e = this.#s - this.working;
			if (e <= 0) return;
			let t = Math.min(this.pending, e);
			for (let e = 0; e < t; e++) this.#t.shift()?.();
			v(`Processed pending tasks: ${this.pending} pending, ${this.working} working.`);
		}
		#d() {
			clearTimeout(this.#a), this.#a = void 0, v(`Processing retry queue: ${this.retrying} retrying, ${this.working} working.`);
			let e = () => {
				this.#a = setTimeout(() => this.#l(), 0);
			}, t = this.#e.shift();
			if (!t) {
				v("Queue is empty, exiting."), this.pending && e();
				return;
			}
			if (b(t, this.#r)) {
				v(`Task ${t.id} was abandoned due to timeout.`), t.reject(t.error), e();
				return;
			}
			if (!y(t, this.#i)) {
				v(`Task ${t.id} is not ready to retry, skipping.`), this.#e.push(t), e();
				return;
			}
			t.lastAttempt = Date.now(), Promise.resolve(t.fn()).then((e) => {
				v(`Task ${t.id} succeeded after ${t.age}ms.`), t.resolve(e);
			}).catch((e) => {
				if (!this.#o(e)) {
					v(`Task ${t.id} failed with non-retryable error: ${e.message}.`), t.reject(e);
					return;
				}
				t.lastAttempt = Date.now(), this.#e.push(t), v(`Task ${t.id} failed, requeueing to try again.`);
			}).finally(() => {
				this.#l();
			});
		}
	};
})), O, k, A, j, M, N, P = e((() => {
	_(), D(), O = /* @__PURE__ */ t(n(), 1), k = new Set(["ENFILE", "EMFILE"]), A = class {
		name;
		isFile;
		isDirectory;
		isSymlink;
		constructor(e) {
			this.name = e.name, this.isFile = e.isFile(), this.isDirectory = e.isDirectory(), this.isSymlink = e.isSymbolicLink();
		}
	}, j = class {
		#e;
		#t;
		constructor({ fsp: e = O.default } = {}) {
			this.#e = e, this.#t = new E((e) => k.has(e.code));
		}
		bytes(e) {
			return this.#t.retry(() => this.#e.readFile(e)).then((e) => new Uint8Array(e.buffer)).catch((e) => {
				if (e.code !== "ENOENT") throw e;
			});
		}
		async write(e, t) {
			let n = Buffer.from(t);
			return this.#t.retry(() => this.#e.writeFile(e, n)).catch((t) => {
				if (t.code === "ENOENT") {
					let t = r.dirname(e instanceof URL ? i(e) : e);
					return this.#e.mkdir(t, { recursive: !0 }).then(() => this.#e.writeFile(e, n));
				}
				throw t;
			});
		}
		async append(e, t) {
			let n = Buffer.from(t);
			return this.#t.retry(() => this.#e.appendFile(e, n)).catch((t) => {
				if (t.code === "ENOENT") {
					let t = r.dirname(e instanceof URL ? i(e) : e);
					return this.#e.mkdir(t, { recursive: !0 }).then(() => this.#e.appendFile(e, n));
				}
				throw t;
			});
		}
		isFile(e) {
			return this.#e.stat(e).then((e) => e.isFile()).catch((e) => {
				if (e.code === "ENOENT") return !1;
				throw e;
			});
		}
		isDirectory(e) {
			return this.#e.stat(e).then((e) => e.isDirectory()).catch((e) => {
				if (e.code === "ENOENT") return !1;
				throw e;
			});
		}
		async createDirectory(e) {
			await this.#e.mkdir(e, { recursive: !0 });
		}
		delete(e) {
			return this.#e.rm(e).then(() => !0).catch((t) => {
				if (t.code === "ERR_FS_EISDIR") return this.#e.rmdir(e).then(() => !0);
				if (t.code === "ENOENT") return !1;
				throw t;
			});
		}
		deleteAll(e) {
			return this.#e.rm(e, { recursive: !0 }).then(() => !0).catch((e) => {
				if (e.code === "ENOENT") return !1;
				throw e;
			});
		}
		async *list(e) {
			let t = await this.#e.readdir(e, { withFileTypes: !0 });
			for (let e of t) yield new A(e);
		}
		size(e) {
			return this.#e.stat(e).then((e) => e.size).catch((e) => {
				if (e.code !== "ENOENT") throw e;
			});
		}
		lastModified(e) {
			return this.#e.stat(e).then((e) => e.mtime).catch((e) => {
				if (e.code !== "ENOENT") throw e;
			});
		}
		async copy(e, t) {
			if ((await this.#e.lstat(e)).isSymbolicLink()) {
				let n = await this.#e.readlink(e);
				return this.#e.symlink(n, t);
			}
			return this.#e.copyFile(e, t);
		}
		async copyAll(e, t) {
			if (await this.isFile(e)) return this.copy(e, t);
			let n = e instanceof URL ? i(e) : e, a = t instanceof URL ? i(t) : t;
			await this.createDirectory(t);
			for await (let t of this.list(e)) {
				let e = r.join(n, t.name), i = r.join(a, t.name);
				if (t.isSymlink) {
					let t = await this.#e.readlink(e);
					await this.#e.symlink(t, i);
				} else t.isDirectory ? await this.copyAll(e, i) : await this.copy(e, i);
			}
		}
		move(e, t) {
			return this.#e.stat(e).then((n) => {
				if (n.isDirectory()) throw Error(`EISDIR: illegal operation on a directory, move '${e}' -> '${t}'`);
				return this.#e.rename(e, t);
			});
		}
		async moveAll(e, t) {
			return this.#e.rename(e, t);
		}
	}, M = class extends m {
		constructor({ fsp: e } = {}) {
			super({ impl: new j({ fsp: e }) });
		}
	}, N = new M();
}));
//#endregion
e((() => {
	P(), _();
}))();
export { N as hfs };
