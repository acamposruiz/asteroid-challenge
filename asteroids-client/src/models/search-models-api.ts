export interface ResponseSearchAPI {
  element_count: number
  links: RootObjectLinksAPI
  near_earth_objects: Record<string, AsteroidAPI[]>
}

export interface RootObjectLinksAPI {
  next: string
  previous: string
  self: string
}

export interface AsteroidAPI {
  id: string
  name: string
  links: NearEarthObjectLinksAPI
  absolute_magnitude_h: number
  close_approach_data: CloseApproachDatumAPI[]
  estimated_diameter: EstimatedDiameterAPI
  is_potentially_hazardous_asteroid: boolean
  is_sentry_object: boolean
  nasa_jpl_url: string
  neo_reference_id: string
}

export interface CloseApproachDatumAPI {
  close_approach_date: string
  close_approach_date_full: string
  epoch_date_close_approach: number
  miss_distance: MissDistanceAPI
  orbiting_body: OrbitingBody
  relative_velocity: RelativeVelocityAPI
}

export interface MissDistanceAPI {
  astronomical: string
  kilometers: string
  lunar: string
  miles: string
}

export enum OrbitingBody {
  Earth = 'Earth',
}

export interface RelativeVelocityAPI {
  kilometers_per_hour: string
  kilometers_per_second: string
  miles_per_hour: string
}

export interface EstimatedDiameterAPI {
  feet: FeetAPI
  kilometers: FeetAPI
  meters: FeetAPI
  miles: FeetAPI
}

export interface FeetAPI {
  estimated_diameter_max: number
  estimated_diameter_min: number
}

export interface NearEarthObjectLinksAPI {
  self: string
}

export interface ResponseErrorAPI {
  code: number
  error_message: string
  http_error: string
  request: string
}
