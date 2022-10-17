import { Component } from "react";
import style from './Modal.module.css'

export class Modal extends Component {
    

    componentDidMount() {
        window.addEventListener('keydown', this.closeByEsc)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeByEsc)
    }

    closeByEsc = (e) => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    }

    closeByBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            this.props.closeModal()
        }
    }

    render() {
        const { image: { src, alt }, closeModal } = this.props

        return(
            <div className={style.backdrop} onClick={this.closeByBackdrop}>
                <div className={style.modal}>
                    <button className={style.closeBtn} onClick={closeModal}>Close</button>
                    <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
                </div>
            </div>
        )
    }
}