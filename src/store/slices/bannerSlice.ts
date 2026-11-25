import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface BannerState {
  activeIndex: number
  isHovered: boolean
  totalSlides: number
}

const initialState: BannerState = {
  activeIndex: 0,
  isHovered: false,
  totalSlides: 3,
}

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setActiveIndex(state, action: PayloadAction<number>) {
      state.activeIndex = action.payload
    },
    setHovered(state, action: PayloadAction<boolean>) {
      state.isHovered = action.payload
    },
    goToNext(state) {
      state.activeIndex = (state.activeIndex + 1) % state.totalSlides
    },
    goToPrev(state) {
      state.activeIndex =
        (state.activeIndex - 1 + state.totalSlides) % state.totalSlides
    },
  },
})

export const { setActiveIndex, setHovered, goToNext, goToPrev } =
  bannerSlice.actions

export default bannerSlice.reducer
