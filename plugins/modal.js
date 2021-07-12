function _createModal(title = 'Default title', closable = true, content = `<p>Default content</p>`, width = '400px') {
    const modal = document.createElement('div');
    modal.classList = 'vmodal';
    
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">${title}</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Lorem ipsum dolor sit.</p>
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `)

    document.body.appendChild(modal);

    const modalWindow = document.querySelector('.modal-window');
    modalWindow.style.width = width;

    if(!closable) {
        const modalClose = document.querySelector('.modal-close');
        modalClose.classList.add('unclosable');
    }
    // Adding user's content
    const modalContent = document.querySelector('.modal-body');
    modalContent.innerHTML = content;

    return modal;
}
// СОЗДАЙ ВЕТКУ!!!!!==========================
/*
* Title: string   + 
* Closable: boolean   +
* Content: html string   +
* Width: string ('400px')
* Destroy(): void
* Close modal window with cross or clicking on overlay
* setContent(html: string): void | public method
* onClose(): void
* onOpen(): 
* beforeClose()
*-----------------------
* animate.css
*/
$.modal = function(title, closable, content, width) {
    const ANIMATION_SPEED = 200;
    const $modal = _createModal(title, closable, content, width);
    let closing = false;

    return {
        open() {
            !closing && $modal.classList.add('open');
        },
        close() {
            closing = true;
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                closing = false;
            }, ANIMATION_SPEED);
        },
        destroy() {}
    }
}