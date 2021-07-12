function _createModal(options) {
    const DEFAULT_WIDTH = '400px';
    const modal = document.createElement('div');
    modal.classList = 'vmodal';
    
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Some title'}</span>
                    ${options.closable ? `<span class="modal-close">&times;</span>` : ''}
                </div>
                <div class="modal-body">
                    ${options.content || 'Some content'}
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `)

    document.body.appendChild(modal);
    return modal;
}
// СОЗДАЙ ВЕТКУ!!!!!==========================
/*
* Title: string   + 
* Closable: boolean   +
* Content: html string   +
* Width: string ('400px')   +
* Destroy(): void   +
* Close modal window with cross or clicking on overlay
* setContent(html: string): void | public method
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

    return {
        open() {
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
        },
        destroy() {
            const modal = document.getElementById('modal');
            modal.remove();
            console.log('reomved');
        }
    }
}