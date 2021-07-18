Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {};

function _createModalFooter(buttons = []) {
    if(buttons.length === 0) {
        return document.createElement('div');
    }

    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');

    buttons.forEach((btn) => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('btn');
        $btn.classList.add(`btn-${btn.type || 'secondary'}`);
        $btn.onclick = btn.handler || noop;

        wrap.appendChild($btn);
    })

    return wrap;
}

function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList = 'vmodal';
    
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">${options.title}</span>
                    <span class="modal-close" data-close="true">&times;</span>
                </div>
                <div class="modal-body" data-content>
                    ${options.content}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);

    const modalWindow = document.querySelector('.modal-window');
    modalWindow.style.width = options.width;

    if(!options.closable) {
        const modalClose = document.querySelector('.modal-close');
        modalClose.classList.add('unclosable');
    }
    // Adding user's content
    // const modalContent = document.querySelector('.modal-body');
    // modalContent.innerHTML = options.content;

    return modal;
}
// СОЗДАЙ ВЕТКУ!!!!!==========================
/*
* Title: string   + 
* Closable: boolean   +
* Content: html string   +
* Width: string ('400px')   +
* Destroy(): void   +
* Close modal window with cross or clicking on overlay   +
* setContent(html: string): void | public method   +
* onClose(): void
* onOpen(): 
* beforeClose()
*-----------------------
* animate.css
*/
$.modal = function(options) {
    const ANIMATION_SPEED = 200;
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;

    const modal = {
        open() {
            if(destroyed) {
                console.log('impossible, modal destroyed!');
            }
            !closing && $modal.classList.add('open');
            $modal.id = 'modal';
        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);
        }
    }

    const listener = event => {
        if(event.target.dataset.close) {
            modal.close();
        }
    }

    $modal.addEventListener('click', listener);

    return Object.assign(modal, {
        destroy() {
            $modal.remove();
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            const bodyContent = $modal.querySelector('[data-content]');
            bodyContent.innerHTML = html;
        }
    });
}