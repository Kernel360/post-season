import React from 'react'
import PropTypes from 'prop-types'
import useWeather from '@/hooks/utils/useWeather.js'
import sun from '@/assets/svg/sun.svg'
import sunCloud from '@/assets/svg/cloud-sun.svg'
import cloudy from '@/assets/svg/cloudy.svg'
import rain from '@/assets/svg/cloud-rain-wind.svg'
import * as S from './ClubSection.styled'
import getImageBySkyStatus from '@/utils/getImageBySkyStatus.js'

function ClubWeather({ club }) {
  const { weatherData, error } = useWeather(club.lat, club.lon)

  if (error) {
    return <div>error: {error.message}</div>
  }
  if (!weatherData) {
    return <div>loading...</div>
  }

  function getWeatherByCategory(category) {
    const weatherItems = weatherData.response.body.items.item.filter(
      item => item.category === category
    )
    return weatherItems
  }
  const SKY = getImageBySkyStatus(getWeatherByCategory('SKY')[0].fcstValue)
  const TEMP = getWeatherByCategory('T1H')[0].fcstValue
  const WIND = getWeatherByCategory('WSD')[0].fcstValue

  console.log(`******* weatherInfo = ${SKY}`)
  return (
    <S.WeatherArea>
      <div>
        <S.Img src={SKY} alt="sky" />
      </div>
      <S.Span>{TEMP}°C</S.Span>
    </S.WeatherArea>
  )
}
// PropTypes 설정
ClubWeather.propTypes = {
  club: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    lat: PropTypes.string.isRequired,
    lon: PropTypes.string.isRequired,
  }).isRequired,
}

export default ClubWeather
