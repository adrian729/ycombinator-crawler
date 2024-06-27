// icons from https://icones.js.org/

export function ArrowLeftIcon() {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <title>Arrow Left</title>
                <path
                    fill="currentColor"
                    d="m13.15 16.15l-3.625-3.625q-.125-.125-.175-.25T9.3 12t.05-.275t.175-.25L13.15 7.85q.075-.075.163-.112T13.5 7.7q.2 0 .35.138T14 8.2v7.6q0 .225-.15.363t-.35.137q-.05 0-.35-.15"
                ></path>
            </svg>
            <span className="sr-only">Arrow Left</span>
        </>
    );
}

export function ArrowRightIcon() {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 24 24"
            >
                <title>Arrow Right</title>
                <path
                    fill="currentColor"
                    d="M10.5 16.3q-.2 0-.35-.137T10 15.8V8.2q0-.225.15-.362t.35-.138q.05 0 .35.15l3.625 3.625q.125.125.175.25t.05.275t-.05.275t-.175.25L10.85 16.15q-.075.075-.162.113t-.188.037"
                ></path>
            </svg>
            <span className="sr-only">Arrow Right</span>
        </>
    );
}
