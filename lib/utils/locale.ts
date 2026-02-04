import type { Language } from '@/components/providers/LanguageContext'

/**
 * 언어에 따라 적절한 필드 반환
 * name_ko가 있으면 한국어일 때 사용, 없으면 항상 name 사용
 */
export function getLocalizedField<T extends Record<string, any>>(
  obj: T,
  fieldName: string,
  language: Language
): string {
  // 기본 필드
  const baseField = fieldName as keyof T
  const baseValue = obj[baseField] as string | undefined

  // 한국어일 때만 name_ko 체크
  if (language === 'ko') {
    const koField = `${fieldName}_ko` as keyof T
    const koValue = obj[koField] as string | undefined
    
    // name_ko가 있으면 사용, 없으면 기본 name 사용
    return koValue || baseValue || ''
  }

  // 영어일 때는 항상 기본 필드 사용
  return baseValue || ''
}

/**
 * KFestivalPlace의 이름 가져오기
 */
export function getKFestivalPlaceName(
  place: { name: { name_en: string; name_ko: string } }, 
  language: Language
): string {
  return language === 'ko' ? place.name.name_ko : place.name.name_en
}

/**
 * KFoodBrand의 이름 가져오기
 */
export function getKFoodBrandName(
  brand: { name: { name_en: string; name_ko: string } }, 
  language: Language
): string {
  return language === 'ko' ? brand.name.name_ko : brand.name.name_en
}

/**
 * POI의 이름 가져오기
 */
export function getPOIName(
  poi: { name: { name_en: string; name_ko: string } }, 
  language: Language
): string {
  return language === 'ko' ? poi.name.name_ko : poi.name.name_en
}

/**
 * POI의 주소 가져오기
 */
export function getPOIAddress(
  poi: { address: { address_en: string; address_ko: string } }, 
  language: Language
): string {
  return language === 'ko' ? poi.address.address_ko : poi.address.address_en
}

/**
 * KContent의 subName 가져오기
 */
export function getKContentSubName(
  content: { subName: { subName_en: string; subName_ko: string } }, 
  language: Language
): string {
  return language === 'ko' ? content.subName.subName_ko : content.subName.subName_en
}

