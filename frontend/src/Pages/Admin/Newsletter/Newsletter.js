import React, { useState, useRef } from 'react';

export default function Newsletter(props) {
    const [ modelContent, setModelContent ] = useState('<h1># This is a heading -#</h1><h4>## This is a small heading -##</h4><a href="https://google.com">!url=https://google.com! This is a link -!!</a>');
    const modelRef = useRef();

    const parseNewsletter = content => {
        let parsed = content;

        parsed = parsed.replace(/<script>(.)*<\/script>/gm, '<h1 style="color: red">Do not try to preform an XSS attack.</h1><h4>This action will be reported to the admin</h4>');
        parsed = parsed.replace(/<script/gm, '<h1 style="color: red">Do not try to preform an XSS attack.</h1><h4>This action will be reported to the admin</h4>');

        parsed = parsed.replace(/~/gm, '<br/>');
        parsed = parsed.replace(/-##/gm, '</h3>');
        parsed = parsed.replace(/##/gm, '<h3>');
        parsed = parsed.replace(/-#/gm, '</h1>');
        parsed = parsed.replace(/#/gm, '<h1>');
        parsed = parsed.replace(/!url=/gm, '<a href="');
        parsed = parsed.replace(/-!!/gm, '</a>');
        parsed = parsed.replace(/\/!/gm, '">');

        return parsed;
    }

    const newsletterSubmitHandler = value => {
        const parsed = parseNewsletter(value);

        if (value !== null && window.confirm("Are you sure you want to initialize this newsletter? Everyone will see it.")) {
            fetch("https://mtms-band-site.herokuapp.com/submitNewsletter", {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({
                    date: new Date().toLocaleDateString(),
                    content: parsed
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                });
        }
    }

    const updatePreview = value => {
        if (value === "") setModelContent('<h1># This is a heading -#</h1><h4>## This is a small heading -##</h4><a href="https://google.com">!url=https://google.com! This is a link -!!</a>');
        else setModelContent(parseNewsletter(value));
    }

    return (
        <div className="admin-newsletter">
            <textarea placeholder="Newsletter..." onChange={e => updatePreview(e.target.value)} resize="none"></textarea>
            <button onClick={e => newsletterSubmitHandler(e.target.previousSibling.value)}>Submit Newsletter</button>
            <div className="newsletter-model" ref={modelRef} dangerouslySetInnerHTML={{
                __html: modelContent
            }}>
                {/* <h1># This is a heading -#</h1>
                <h4>## This is a small heading -##</h4>
                <a href="https://google.com">!url=https://google.com! This is a link -!!</a> */}
            </div>
        </div>
    );
}